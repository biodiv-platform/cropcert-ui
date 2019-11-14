import "@styles/medium.scss";

import { selectInput, textInput } from "@components/@core/formik";
import wysiwygInput from "@components/@core/formik/wysiwyg";
import { axUpdatePage } from "@services/pages.services";
import { local2utc, messageRedirect } from "@utils/basic.util";
import { PAGE_TYPE_OPTIONS } from "@utils/constants";
import { getUserKey } from "@utils/user.util";
import { Button } from "carbon-components-react";
import { Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

export default function ManagePage({ mode, page, id }) {
  const [initialValues, setInitialValues] = useState();

  useEffect(() => {
    setInitialValues(
      mode !== "edit"
        ? {
            content: "",
            pageType: PAGE_TYPE_OPTIONS.CONTENT.value,
            ...page,
            parentId: id,
            authorId: getUserKey("id"),
          }
        : page
    );
  }, [page]);

  const pageForm = {
    validationSchema: Yup.object().shape({
      title: Yup.string().required(),
      content: Yup.string().nullable(),
      url: Yup.string().nullable(),
      heading: Yup.string().required(),
      authorId: Yup.string().required(),
      pageType: Yup.string().required(),
    }),
  };

  const handleSubmit = (values, actions) => {
    actions.setSubmitting(false);
    axUpdatePage(
      {
        ...values,
        createdOn: local2utc().getTime(),
        modifiedOn: local2utc().getTime(),
        isDeleted: false,
      },
      mode
    ).then(response =>
      messageRedirect({ ...response, mcode: `PAGE_${mode.toUpperCase()}` })
    );
  };

  return initialValues ? (
    <Formik
      {...pageForm}
      enableReinitialize={true}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {props => {
        const isContentInput =
          props.values.pageType === PAGE_TYPE_OPTIONS.CONTENT.value;
        return (
          <form className="bx--form mb-4" onSubmit={props.handleSubmit}>
            <div className="bx--row">
              <div className="bx--col-lg-3 bx--col-sm-12">
                <Field
                  label="Page Type"
                  name="pageType"
                  component={selectInput}
                  options={[
                    PAGE_TYPE_OPTIONS.CONTENT,
                    PAGE_TYPE_OPTIONS.REDIRECT,
                  ]}
                />
              </div>
              <div className="bx--col-lg-4 bx--col-sm-12">
                <Field
                  label="Menu Heading"
                  name="title"
                  component={textInput}
                />
              </div>
              <div className="bx--col-lg-5 bx--col-sm-12">
                <Field
                  label="Page Title"
                  name="heading"
                  component={textInput}
                />
              </div>
            </div>
            <div className="bx--row">
              <div className="bx--col-lg-12 bx--col-sm-12">
                {isContentInput ? (
                  <Field
                    label="Content"
                    name="content"
                    component={wysiwygInput}
                  />
                ) : (
                  <Field label="Link" name="url" component={textInput} />
                )}
              </div>
            </div>
            <Button type="submit" disabled={!props.isValid}>
              Save {isContentInput ? "Page" : "Link"}
            </Button>
          </form>
        );
      }}
    </Formik>
  ) : (
    <>Loading...</>
  );
}
