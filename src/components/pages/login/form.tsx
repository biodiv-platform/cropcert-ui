import { ArrowForwardIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import BlueLink from "@components/@core/blue-link";
import { PageHeading } from "@components/@core/layout";
import OTPModal from "@components/auth/otp-modal";
import { CheckBoxField } from "@components/form/checkbox";
import { PasswordInputField } from "@components/form/password";
import { SubmitButton } from "@components/form/submit-button";
import { TextBoxField } from "@components/form/text";
import SITE_CONFIG from "@configs/site-config";
import { yupResolver } from "@hookform/resolvers/yup";
import { axGetUser, axLogin } from "@services/auth.service";
import { VERIFICATION_MODE } from "@static/constants";
import { SIGN_IN } from "@static/messages";
import { forwardRedirect, registerSW, removeCache, setCookies, unregisterSW } from "@utils/auth";
import notification from "@utils/notification";
import NextLink from "next/link";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";

import Oauth from "./oauth";

interface ISignInFormProps {
  onSuccess?;
  redirect?: boolean;
  forward?;
}
function LoginForm({ onSuccess, redirect = true, forward }: ISignInFormProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { t } = useTranslation();
  const [user, setUser] = useState();
  const { isOpen, onClose, onOpen } = useDisclosure();

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

      if (tokens?.verificationRequired) {
        setUser(tokens.user);
        onOpen();
        return;
      } else {
        authSuccessForward(tokens);
      }

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
      window.location.assign("/");
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

  const authSuccessForward = async (tokens) => {
    setCookies(tokens);
    redirect && forwardRedirect(forward);
    onSuccess && onSuccess();
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
          <Flex justifyContent="space-between" alignItems="center">
            <SubmitButton>
              Sign In <ArrowForwardIcon ml={2} />
            </SubmitButton>
            <NextLink href="/register/forgotPassword" legacyBehavior>
              <BlueLink display="block">{t("auth:forgot_password_link")}</BlueLink>
            </NextLink>
          </Flex>
        </form>
      </FormProvider>
      {SITE_CONFIG.TOKENS.OAUTH_GOOGLE ? (
        <>
          <Box textAlign="center" color="gray.500" my={4}>
            {t("common:or")}
          </Box>

          <Oauth text={t("auth:with_google")} onSuccess={onOAuthSuccess} />
        </>
      ) : (
        <Box py={4} />
      )}
      {t("auth:sign_up")}
      <NextLink href="/register" legacyBehavior>
        <BlueLink ml={2}>
          {t("auth:sign_up_link")}
          <ChevronRightIcon />
        </BlueLink>
      </NextLink>
      <OTPModal isOpen={isOpen} onClose={onClose} user={user} />
    </>
  );
}

export default LoginForm;
