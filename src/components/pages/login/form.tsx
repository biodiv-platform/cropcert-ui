import { ArrowForwardIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import BlueLink from "@components/@core/blue-link";
import { PageHeading } from "@components/@core/layout";
import { CheckBoxField } from "@components/form/checkbox";
import { PasswordInputField } from "@components/form/password";
import { SubmitButton } from "@components/form/submit-button";
import { TextBoxField } from "@components/form/text";
import SITE_CONFIG from "@configs/site-config";
import { yupResolver } from "@hookform/resolvers/yup";
import { axGetUser, axLogin } from "@services/auth.service";
import { VERIFICATION_MODE } from "@static/constants";
import { SIGN_IN } from "@static/messages";
import { registerSW, removeCache, setCookies, unregisterSW } from "@utils/auth";
import notification from "@utils/notification";
import NextLink from "next/link";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";

import Oauth from "./oauth";

function LoginForm() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { t } = useTranslation();

  const hForm = useForm<any>({
    mode: "onChange",
    resolver: yupResolver(
      Yup.object().shape({
        username: Yup.string().email().required(),
        password: Yup.string().required(),
        prepareOffline: Yup.boolean().notRequired(),
      })
    ),
    defaultValues: {
      username: "",
      password: "",
      prepareOffline: true,
    },
  });

  const handleOnSubmit = async ({ prepareOffline, ...values }: any) => {
    try {
      const tokens = await axLogin({
        ...values,
        mode: VERIFICATION_MODE.MANUAL,
      });
      setCookies({ tokens });

      const user = await axGetUser();
      setCookies({ user });
      setIsLoggedIn(true);

      if (SITE_CONFIG.SITE.OFFLINE) {
        // remove cache
        await unregisterSW();
        await removeCache();

        if (prepareOffline) {
          await registerSW();
        }
      }

      // hard redirect to re-build cache
      window.location.assign("/dashboard");
    } catch (e) {
      console.error(e);
      notification(SIGN_IN.ERROR);
    }
  };

  const onOAuthSuccess = (r) => {
    handleOnSubmit({
      email: r.profileObj.email,
      password: r.tokenId,
      mode: VERIFICATION_MODE.OAUTH_GOOGLE,
    });
  };

  return (
    <>
      <PageHeading>{isLoggedIn ? "Redirecting..." : "Sign in to your account"}</PageHeading>
      <FormProvider {...hForm}>
        <form onSubmit={hForm.handleSubmit(handleOnSubmit)}>
          <TextBoxField name="username" autoComplete="username" label="Username" />
          <PasswordInputField name="password" autoComplete="current-password" label="Password" />
          {SITE_CONFIG.SITE.OFFLINE && (
            <CheckBoxField name="prepareOffline" label="Offline Ready" />
          )}
          <SubmitButton>
            Sign In <ArrowForwardIcon ml={2} />
          </SubmitButton>
        </form>
      </FormProvider>

      <Box textAlign="center" color="gray.500" my={4}>
        {t("common:or")}
      </Box>

      <Oauth text={t("auth:with_google")} onSuccess={onOAuthSuccess} />

      {t("auth:sign_up")}
      <NextLink href="/register">
        <BlueLink ml={2}>
          {t("auth:sign_up_link")}
          <ChevronRightIcon />
        </BlueLink>
      </NextLink>
    </>
  );
}

export default LoginForm;
