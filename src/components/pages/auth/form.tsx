import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Submit, TextBox } from "@components/@core/formik";
import PasswordInputField from "@components/@core/formik/password";
import { axGetUser, axSignIn } from "@services/auth.service";
import { TOKEN } from "@static/constants";
import { SIGN_IN } from "@static/messages";
import { removeCache, unregisterSW } from "@utils/auth.util";
import notification from "@utils/notification.util";
import { Formik } from "formik";
import useNookies from "next-nookies-persist";
import React from "react";
import * as Yup from "yup";

function SignInForm() {
  const { setNookie } = useNookies();

  const signInForm = {
    validationSchema: Yup.object().shape({
      userName: Yup.string().email().required(),
      password: Yup.string().required(),
    }),
    initialValues: {
      userName: "",
      password: "",
    },
  };

  const handleOnSubmit = async (values, actions) => {
    try {
      const token = await axSignIn(values);
      setNookie(TOKEN.AUTH, token);
      const user = await axGetUser();
      setNookie(TOKEN.USER, user);

      // remove cache
      await unregisterSW();
      await removeCache();

      // hard redirect to re-build cache
      window.location.assign("/dashboard");
    } catch (e) {
      console.error(e);
      notification(SIGN_IN.ERROR);
    }
    actions.setSubmitting(false);
  };

  return (
    <Formik {...signInForm} onSubmit={handleOnSubmit}>
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <TextBox name="userName" autocomplete="username" label="Username" />
          <PasswordInputField name="password" autocomplete="current-password" label="Password" />
          <Submit>
            Sign In <ArrowForwardIcon ml={2} />
          </Submit>
        </form>
      )}
    </Formik>
  );
}

export default SignInForm;
