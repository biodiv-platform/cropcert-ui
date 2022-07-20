import { Box } from "@chakra-ui/react";
import { CoreGrid } from "@components/@core/layout";
import { DropzoneInputField } from "@components/form/dropzone";
import { SelectInputField } from "@components/form/select";
import { SubmitButton } from "@components/form/submit-button";
import { TextBoxField } from "@components/form/text";
import { WYSIWYGField } from "@components/form/wysiwyg";
import { yupResolver } from "@hookform/resolvers/yup";
import { axUpdatePage } from "@services/page.service";
import { PAGE_TYPE_OPTIONS } from "@static/constants";
import { PAGES } from "@static/messages";
import { local2utc } from "@utils/basic.util";
import notification, { NotificationType } from "@utils/notification.util";
import Router from "next/router";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Page } from "types/pages";
import * as Yup from "yup";

export default function PageEditorComponent({ page, isEdit }: { page: Page; isEdit: boolean }) {
  const hForm = useForm<any>({
    mode: "onBlur",
    resolver: yupResolver(
      Yup.object().shape({
        title: Yup.string().required(),
        content: Yup.string().nullable(),
        url: Yup.string().nullable(),
        bannerUrl: Yup.string().nullable(),
        description: Yup.string().nullable(),
        heading: Yup.string().required(),
        authorId: Yup.string().required(),
        pageType: Yup.string().required(),
      })
    ),
    defaultValues: page,
  });

  const pageTypeOptions = Object.values(PAGE_TYPE_OPTIONS);

  const handleSubmit = async (values) => {
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
  };

  const pageType = hForm.watch("pageType");

  const isContentInput = pageType === PAGE_TYPE_OPTIONS.CONTENT.value;

  return (
    <FormProvider {...hForm}>
      <form onSubmit={hForm.handleSubmit(handleSubmit)}>
        <CoreGrid rows={4}>
          <Box gridColumn="1/4">
            <CoreGrid rows={2}>
              <SelectInputField
                label="Page Type"
                name="pageType"
                options={pageTypeOptions}
                // selectOnOne={false}
              />
              <TextBoxField label="Menu Heading" name="title" />
            </CoreGrid>
            <TextBoxField label="Page Title" name="heading" />
            <TextBoxField label="Description" name="description" />
          </Box>
          <DropzoneInputField label="Banner Image" name="bannerUrl" />
        </CoreGrid>

        {isContentInput ? (
          <WYSIWYGField label="Content" name="content" />
        ) : (
          <TextBoxField label="Link" name="url" />
        )}

        <SubmitButton>Save {isContentInput ? "Page" : "Link"}</SubmitButton>
      </form>
    </FormProvider>
  );
}
