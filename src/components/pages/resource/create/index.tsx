import Container from "@components/@core/container";
import { PageHeading } from "@components/@core/layout";
import { SubmitButton } from "@components/form/submit-button";
import MediaGalleryUploader from "@components/pages/media-gallery/create/uploader";
import { axMediaGalleryResourceUpload } from "@services/media-gallery.service";
import { RESOURCES_UPLOADING } from "@static/events";
import notification, { NotificationType } from "@utils/notification";
import router from "next/router";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import { useListener } from "react-gbus";
import { FormProvider, useForm } from "react-hook-form";
import { LuCheck } from "react-icons/lu";

export default function ResourceCreatePageComponent(props) {
  const { t } = useTranslation();
  const [isSubmitDisabled, setIsSubmitDisabled] = useState();

  useListener(
    (isUploading) => {
      setIsSubmitDisabled(isUploading);
    },
    [RESOURCES_UPLOADING]
  );
  const hForm = useForm<any>({
    mode: "onChange",
  });

  const handleOnSubmit = async (values) => {
    const { resources, tags } = values;

    const payload = resources.map((resource) => ({
      path: resource.path,
      url: resource.url,
      type: resource.type,
      caption: resource.caption,
      rating: resource.rating,
      licenseId: resource.licenseId,
      context: resource.context,
      languageId: resource.languageId,
      contributor: resource?.contributor,

      tags: tags
        ? tags.map((tag) => ({
            id: !isNaN(tag.value) ? Number(tag.value) : null,
            name: tag.label,
          }))
        : [],
    }));

    const { success } = await axMediaGalleryResourceUpload(payload);

    if (success) {
      notification(t("common:resource.save.success"), NotificationType.Success);
      router.push(`/media-gallery/list`);
    } else {
      notification(t("common:resource.contribute"));
    }
  };

  return (
    <Container py={6}>
      <PageHeading>📷 {t("common:resource.contribute")}</PageHeading>

      <FormProvider {...hForm}>
        <form onSubmit={hForm.handleSubmit(handleOnSubmit)}>
          <MediaGalleryUploader
            name="resources"
            isMultiUpload={false}
            licensesList={props.licensesList}
          />
          <SubmitButton leftIcon={<LuCheck />} isDisabled={isSubmitDisabled}>
            {t("common:resource.save.title")}
          </SubmitButton>
        </form>
      </FormProvider>
    </Container>
  );
}
