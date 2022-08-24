import { ArrowForwardIcon } from "@chakra-ui/icons";
import { PageHeading } from "@components/@core/layout";
import { CheckBoxField } from "@components/form/checkbox";
import { PasswordInputField } from "@components/form/password";
import { SubmitButton } from "@components/form/submit-button";
import { TextBoxField } from "@components/form/text";
import { yupResolver } from "@hookform/resolvers/yup";
import { axGetUser, axSignIn } from "@services/auth.service";
import { VERIFICATION_MODE } from "@static/constants";
import { SIGN_IN } from "@static/messages";
import { registerSW, removeCache, setCookies, unregisterSW } from "@utils/auth";
import notification from "@utils/notification";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";

function SignInForm() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const handleOnSubmit = async ({ prepareOffline, ...values }) => {
    try {
      const tokens = await axSignIn({
        ...values,
        mode: VERIFICATION_MODE.MANUAL,
      });
      setCookies({ tokens });

      const user = await axGetUser();
      setCookies({ user });
      setIsLoggedIn(true);

      // remove cache
      await unregisterSW();
      await removeCache();

      if (prepareOffline) {
        await registerSW();
      }

      // hard redirect to re-build cache
      window.location.assign("/dashboard");
    } catch (e) {
      console.error(e);
      notification(SIGN_IN.ERROR);
    }
  };

  return (
    <>
      <PageHeading>{isLoggedIn ? "Redirecting..." : "Sign in to your account"}</PageHeading>
      <FormProvider {...hForm}>
        <form onSubmit={hForm.handleSubmit(handleOnSubmit)}>
          <TextBoxField name="username" autoComplete="username" label="Username" />
          <PasswordInputField name="password" autoComplete="current-password" label="Password" />
          <CheckBoxField name="prepareOffline" label="Offline Ready" />
          <SubmitButton>
            Sign In <ArrowForwardIcon ml={2} />
          </SubmitButton>
        </form>
      </FormProvider>
    </>
  );
}

export default SignInForm;
