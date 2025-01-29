import { Spinner, useDisclosure } from "@chakra-ui/react";
import { PageHeading } from "@components/@core/layout";
import { SubmitButton } from "@components/form/submit-button";
import { yupResolver } from "@hookform/resolvers/yup";
import useGlobalState from "@hooks/use-global-state";
import { AssetStatus } from "@interfaces/custom";
import { MediaGalleryUpdateData } from "@interfaces/media";
import { axUpdateMediaGalleryById } from "@services/media-gallery.service";
import { ROLES } from "@static/constants";
import { hasAccess } from "@utils/auth";
import notification, { NotificationType } from "@utils/notification";
import { nanoid } from "nanoid";
import router from "next/router";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { LuCheck } from "react-icons/lu";
import * as Yup from "yup";

import BasicInfo from "../../create/basic-info";
import MediaGalleryUploader from "../../create/uploader";

interface IMediaGalleryEditFormProps {
  mediaGallery: MediaGalleryUpdateData;
  mId;
  licensesList;
}
export default function MediaGalleryEditForm({
  mediaGallery,
  licensesList,
  mId,
}: IMediaGalleryEditFormProps) {
  const { open } = useDisclosure({ defaultOpen: true });

  const { user } = useGlobalState();
  const isAdmin = hasAccess([ROLES.ADMIN], user);

  const { t } = useTranslation();

  const hForm = useForm<any>({
    mode: "onChange",
    resolver: yupResolver(Yup.object().shape({})),
    defaultValues: {
      ...mediaGallery?.mediaGalleryResource,
      name: mediaGallery.mediaGallery?.name,
      description: mediaGallery.mediaGallery?.description,

      resources: mediaGallery?.mediaGalleryResource?.map((r) => ({
        ...r,
        hashKey: nanoid(),
        status: AssetStatus.Uploaded,
        licenseId: r.resource.licenseId?.toString(),
        isUsed: 1,
        rating: r.resource.rating || 0,
        path: r.resource.fileName,
        fileName: r.resource.fileName,
        url: r.resource.url,
        languageId: r.resource.languageId,
        context: r.resource.context,
        caption: r.resource.description,
        contributor: r.resource.contributor,
        tags: r.tags,
      })),
    },
  });

  const handleOnSubmit = async (values) => {
    const { resources, name, description } = values;

    const payload = {
      name: name,
      description: description,
      updatedOn: new Date().toISOString(),

      resourcesList: resources?.map((resource) => ({
        id: resource?.resource?.id,
        path: resource.path,
        url: resource.url,
        type: resource?.type || resource?.resource?.type,
        caption: resource?.caption,
        rating: resource?.rating || 0,
        licenseId: resource.licenseId?.toString(),
        contributor: resource?.contributor,

        tags: resource.tags,
      })),
    };

    const { success } = await axUpdateMediaGalleryById(mId, payload);
    if (success) {
      notification(t("Media Gallery Edit Sucessfully"), NotificationType.Success);
      router.push(`/media-gallery/show/${mId}`);
    } else {
      notification(t("Unable to Edit Media gallery"));
    }
  };
  return open ? (
    <FormProvider {...hForm}>
      <form onSubmit={hForm.handleSubmit(handleOnSubmit)}>
        <BasicInfo isEdit={isAdmin} />
        <PageHeading>📷 {t("Edit or Upload Media")}</PageHeading>
        <MediaGalleryUploader name="resources" isMultiUpload={false} licensesList={licensesList} />

        <SubmitButton leftIcon={<LuCheck />} mb={4}>
          {t("Save")}
        </SubmitButton>
      </form>
    </FormProvider>
  ) : (
    <Spinner />
  );
}
