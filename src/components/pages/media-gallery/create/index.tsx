import { CheckIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import Container from "@components/@core/container";
import { PageHeading } from "@components/@core/layout";
import { SubmitButton } from "@components/form/submit-button";
import useGlobalState from "@hooks/use-global-state";
import { axMediaGalleryResourceCreate } from "@services/media-gallery.service";
import { ROLES } from "@static/constants";
import { hasAccess } from "@utils/auth";
import notification, { NotificationType } from "@utils/notification";
import router from "next/router";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

import BasicInfo from "./basic-info";
import MediaGalleryUploader from "./uploader";

export default function MediaGalleryCreatePageComponent({ licensesList }) {
  const { t } = useTranslation();
  const { user } = useGlobalState();

  const isAdmin = hasAccess([ROLES.ADMIN], user);

  const hForm = useForm<any>({
    mode: "onChange",
  });

  const handleOnSubmit = async (values) => {
    const { resources, name, description, tags } = values;

    const payload = {
      name: name,
      description: description,
      resourcesList: resources?.map((resource) => ({
        path: resource.path,
        url: resource.url,
        type: resource.type,
        caption: resource.caption,
        rating: resource.rating,
        licenseId: resource?.licenseId,
        context: resource.context,
        languageId: resource.languageId,
        contributor: resource.languageId,
        tags: tags
          ? tags.map((tag) => ({
              id: !isNaN(tag.value) ? Number(tag.value) : null,
              name: tag.label,
            }))
          : [],
      })),
    };

    const { success, data } = await axMediaGalleryResourceCreate(payload);

    if (success) {
      notification(t("common:media_gallery.upload.success"), NotificationType.Success);
      router.push(`/media-gallery/show/${data.mediaGallery.id}`);
    } else {
      notification(t("common:media_gallery.upload.failure"));
    }
  };

  return (
    <Container py={6}>
      <FormProvider {...hForm}>
        <form onSubmit={hForm.handleSubmit(handleOnSubmit)}>
          <Box hidden={!isAdmin}>
            <BasicInfo isEdit={false} />
          </Box>
          <PageHeading>📷 {t("common:media_gallery.upload.name")}</PageHeading>

          <MediaGalleryUploader name="resources" licensesList={licensesList} />

          <SubmitButton leftIcon={<CheckIcon />}>{t("common:resource.save.title")}</SubmitButton>
        </form>
      </FormProvider>
    </Container>
  );
}
