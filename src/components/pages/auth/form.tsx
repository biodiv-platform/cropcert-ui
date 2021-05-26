import { Icon } from "@chakra-ui/core";
import { Submit, TextBox } from "@components/@core/formik";
import PasswordInputField from "@components/@core/formik/password";
import { axGetUser, axSignIn } from "@services/auth.service";
import { TOKEN } from "@static/constants";
import { SIGN_IN } from "@static/messages";
import notification from "@utils/notification.util";
import { Formik } from "formik";
import useNookies from "next-nookies-persist";
import Router from "next/router";
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
      Router.push("/dashboard");
    } catch (e) {
      notification(SIGN_IN.ERROR);
    }
    actions.setSubmitting(false);
  };

  return (
    <Formik {...signInForm} onSubmit={handleOnSubmit}>
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <TextBox name="userName" label="Username" />
          <PasswordInputField name="password" label="Password" />
          <Submit>
            Sign In <Icon ml={2} name="arrow-forward" />
          </Submit>
        </form>
      )}
    </Formik>
  );
}

export default SignInForm;
