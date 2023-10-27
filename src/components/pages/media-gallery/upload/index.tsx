import { CheckIcon } from "@chakra-ui/icons";
import Container from "@components/@core/container";
import { PageHeading } from "@components/@core/layout";
import { SubmitButton } from "@components/form/submit-button";
import useGlobalState from "@hooks/use-global-state";
import { axMediaGalleryResourceUpload } from "@services/media-gallery.service";
import { RESOURCES_UPLOADING } from "@static/events";
import notification, { NotificationType } from "@utils/notification";
import router from "next/router";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import { useListener } from "react-gbus";
import { FormProvider, useForm } from "react-hook-form";

import MediaGalleryUploader from "../create/uploader";

export default function MediaGalleryUploadComponent(props) {
  const { t } = useTranslation();
  const [isSubmitDisabled, setIsSubmitDisabled] = useState();
  const { user } = useGlobalState();

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
      contributor: user?.id,

      tags: tags
        ? tags.map((tag) => ({
            id: !isNaN(tag.value) ? Number(tag.value) : null,
            name: tag.label,
          }))
        : [],
      mId: resource?.mId || [props.mediaGalleryData.id],
    }));

    const { success } = await axMediaGalleryResourceUpload(payload);

    if (success) {
      notification(t("common:media_gallery.upload.success"), NotificationType.Success);
      router.push(`/media-gallery/list`);
    } else {
      notification(t("common:media_gallery.upload.failure"));
    }
  };

  return (
    <Container py={6}>
      <PageHeading>📷 {`Upload to ${props.mediaGalleryData.name} Media Gallery`}</PageHeading>

      <FormProvider {...hForm}>
        <form onSubmit={hForm.handleSubmit(handleOnSubmit)}>
          <MediaGalleryUploader
            name="resources"
            isMultiUpload={false}
            licensesList={props.licensesList}
          />
          <SubmitButton leftIcon={<CheckIcon />} isDisabled={isSubmitDisabled}>
            {t("common:resource.save.title")}
          </SubmitButton>
        </form>
      </FormProvider>
    </Container>
  );
}
