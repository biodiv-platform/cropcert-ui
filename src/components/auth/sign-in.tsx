import { ArrowRight16 } from "@carbon/icons-react";
import { textInput } from "@components/@core/formik";
import { axGetUser, axSignIn } from "@services/auth.service";
import { setSession } from "@utils/auth.util";
import { MESSAGE } from "@utils/constants";
import { setUser } from "@utils/user.util";
import { Button, InlineNotification } from "carbon-components-react";
import { Field, Formik } from "formik";
import { navigate } from "gatsby";
import React, { useState } from "react";
import * as Yup from "yup";

export default function SignIn() {
  const [canSubmit, setCanSubmit] = useState(true);
  const [showError, setShowError] = useState(false);

  const signInForm = {
    validationSchema: Yup.object().shape({
      userName: Yup.string().email(),
      password: Yup.string(),
    }),
    initialValues: {
      userName: "",
      password: "",
    },
  };

  const onSignInSubmit = (values, actions) => {
    actions.setSubmitting(false);
    axSignIn(values)
      .then(d => {
        setSession(d);
        axGetUser().then(u => {
          setUser(u);
          navigate("/dashboard");
        });
      })
      .catch(() => {
        setShowError(true);
      })
      .finally(() => {
        setCanSubmit(true);
      });
  };

  return (
    <div className="bx--grid eco--sign-in">
      <Formik
        {...signInForm}
        onSubmit={onSignInSubmit}
        render={({ handleSubmit, isValid }) => {
          return (
            <form className="bx--form" onSubmit={handleSubmit}>
              <div className="bx--row">
                <div className="bx--col-lg-4 bx--offset-lg-4 bx--col-sm-12">
                  <h1 className="cas--heading">Sign in to your account</h1>

                  {showError && (
                    <InlineNotification
                      kind="error"
                      lowConstrast={true}
                      role="alert"
                      title={MESSAGE.INVALID_CREDENTIALS}
                    />
                  )}

                  <Field
                    label="Username"
                    name="userName"
                    component={textInput}
                  />
                  <Field
                    label="Password"
                    name="password"
                    type="password"
                    component={textInput}
                  />
                  <Button
                    kind="secondary"
                    disabled={!isValid || !canSubmit}
                    renderIcon={ArrowRight16}
                    type="submit"
                  >
                    Sign In
                  </Button>
                </div>
              </div>
            </form>
          );
        }}
      />
    </div>
  );
}
