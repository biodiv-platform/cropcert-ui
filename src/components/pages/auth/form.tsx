import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Submit, TextBox } from "@components/@core/formik";
import CheckBoxInputField from "@components/@core/formik/checkbox";
import PasswordInputField from "@components/@core/formik/password";
import { PageHeading } from "@components/@core/layout";
import { axGetUser, axSignIn } from "@services/auth.service";
import { TOKEN } from "@static/constants";
import { SIGN_IN } from "@static/messages";
import { registerSW, removeCache, unregisterSW } from "@utils/auth.util";
import notification from "@utils/notification.util";
import { Formik } from "formik";
import useNookies from "next-nookies-persist";
import React, { useState } from "react";
import * as Yup from "yup";

function SignInForm() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setNookie } = useNookies();

  const signInForm = {
    validationSchema: Yup.object().shape({
      userName: Yup.string().email().required(),
      password: Yup.string().required(),
      prepareOffline: Yup.boolean().notRequired(),
    }),
    initialValues: {
      userName: "",
      password: "",
      prepareOffline: true,
    },
  };

  const handleOnSubmit = async ({ prepareOffline, ...values }, actions) => {
    try {
      const token = await axSignIn(values);
      setNookie(TOKEN.AUTH, token);
      const user = await axGetUser();
      setNookie(TOKEN.USER, user);
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
    actions.setSubmitting(false);
  };

  return (
    <>
      <PageHeading>{isLoggedIn ? "Redirecting..." : "Sign in to your account"}</PageHeading>
      <Formik {...signInForm} onSubmit={handleOnSubmit}>
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <TextBox name="userName" autoComplete="username" label="Username" />
            <PasswordInputField name="password" autoComplete="current-password" label="Password" />
            <CheckBoxInputField name="prepareOffline" label="Offline Ready" />
            <Submit>
              Sign In <ArrowForwardIcon ml={2} />
            </Submit>
          </form>
        )}
      </Formik>
    </>
  );
}

export default SignInForm;
