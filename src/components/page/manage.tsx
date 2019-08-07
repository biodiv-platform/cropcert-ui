import "@styles/medium.scss";

import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import CKEditor from "@ckeditor/ckeditor5-react";
import { textInput } from "@components/@core/formik";
import { axUpdatePage } from "@services/pages.services";
import { local2utc, messageRedirect } from "@utils/basic.util";
import { ENDPOINT } from "@utils/constants";
import { getUserKey } from "@utils/user.util";
import { Button } from "carbon-components-react";
import SimpleuploadPlugin from "ckeditor5-simple-upload/src/simpleupload";
import { Field, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

export default function ManagePage({ mode, page, id }) {
  const [initialValues, setInitialValues] = useState();

  useEffect(() => {
    setInitialValues(
      mode !== "edit"
        ? { ...page, parentId: id, authorId: getUserKey("id") }
        : page
    );
  }, [page]);

  const pageForm = {
    validationSchema: Yup.object().shape({
      title: Yup.string().required(),
      content: Yup.string().required(),
      authorId: Yup.string().required(),
    }),
  };

  const handleSubmit = (values, actions) => {
    actions.setSubmitting(false);
    axUpdatePage(
      {
        ...values,
        createdOn: local2utc(),
        modifiedOn: local2utc(),
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
      render={props => (
        <form className="bx--form" onSubmit={props.handleSubmit}>
          <div className="bx--row">
            <div className="bx--col-lg-8 bx--col-sm-12">
              <Field label="Title" name="title" component={textInput} />
            </div>
          </div>
          <div className="bx--row">
            <div className="bx--col-lg-8 bx--col-sm-12">
              <CKEditor
                editor={DecoupledEditor}
                onInit={editor => {
                  editor.ui
                    .getEditableElement()
                    .parentElement.insertBefore(
                      editor.ui.view.toolbar.element,
                      editor.ui.getEditableElement()
                    );
                }}
                data={props.values.content}
                config={{
                  extraPlugins: [SimpleuploadPlugin],
                  simpleUpload: {
                    uploadUrl: `${ENDPOINT.PAGES}/image`,
                  },
                }}
                onChange={(event, editor) => {
                  props.setFieldValue("content", editor.getData());
                }}
              />
            </div>
          </div>
          <br />
          <Button type="submit" disabled={!props.isValid}>
            Create/Update Page
          </Button>
        </form>
      )}
    />
  ) : (
    <>"Loading"</>
  );
}
