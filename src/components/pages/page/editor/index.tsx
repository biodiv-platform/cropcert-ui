import { Box } from "@chakra-ui/core";
import { Select, Submit, TextBox } from "@components/@core/formik";
import DropzoneInputField from "@components/@core/formik/dropzone";
import Wysiwyg from "@components/@core/formik/wysiwyg";
import { CoreGrid } from "@components/@core/layout";
import { axUpdatePage } from "@services/page.service";
import { PAGE_TYPE_OPTIONS } from "@static/constants";
import { PAGES } from "@static/messages";
import { local2utc } from "@utils/basic.util";
import notification, { NotificationType } from "@utils/notification.util";
import { Formik } from "formik";
import Router from "next/router";
import React from "react";
import { Page } from "types/pages";
import * as Yup from "yup";

export default function PageEditorComponent({ page, isEdit }: { page: Page; isEdit: boolean }) {
  const pageForm = {
    validationSchema: Yup.object().shape({
      title: Yup.string().required(),
      content: Yup.string().nullable(),
      url: Yup.string().nullable(),
      bannerUrl: Yup.string().nullable(),
      description: Yup.string().nullable(),
      heading: Yup.string().required(),
      authorId: Yup.string().required(),
      pageType: Yup.string().required(),
    }),
    initialValues: page,
  };

  const pageTypeOptions = Object.values(PAGE_TYPE_OPTIONS);

  const handleSubmit = async (values, actions) => {
    const payload = {
      ...values,
      createdOn: local2utc().getTime(),
      modifiedOn: local2utc().getTime(),
      isDeleted: false,
    };
    const { success } = await axUpdatePage(payload, isEdit);
    if (success) {
      notification(PAGES.PAGE_UPDATED, NotificationType.Success);
      Router.push("/page/list");
    }
    actions.setSubmitting(false);
  };

  return (
    <Formik {...pageForm} onSubmit={handleSubmit}>
      {(props) => {
        const isContentInput = props.values.pageType === PAGE_TYPE_OPTIONS.CONTENT.value;
        return (
          <form onSubmit={props.handleSubmit}>
            <CoreGrid rows={4}>
              <Box gridColumn="1/4">
                <CoreGrid rows={2}>
                  <Select
                    label="Page Type"
                    name="pageType"
                    options={pageTypeOptions}
                    selectOnOne={false}
                  />
                  <TextBox label="Menu Heading" name="title" />
                </CoreGrid>
                <TextBox label="Page Title" name="heading" />
                <TextBox label="Description" name="description" />
              </Box>
              <DropzoneInputField label="Banner Image" name="bannerUrl" />
            </CoreGrid>

            {isContentInput ? (
              <Wysiwyg label="Content" name="content" />
            ) : (
              <TextBox label="Link" name="url" />
            )}

            <Submit>Save {isContentInput ? "Page" : "Link"}</Submit>
          </form>
        );
      }}
    </Formik>
  );
}
