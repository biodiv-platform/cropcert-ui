import { authorizedPageSSP } from "@components/auth/auth-redirect";
import MediaGalleryUploadComponent from "@components/pages/media-gallery/upload";
import { axGetMediaGallery } from "@services/media-gallery.service";
import { axGetLicenseList } from "@services/resources.service";
import { ROLES } from "@static/constants";
import { DEFAULT_MEDIA_GALLERY_FILTER } from "@static/media-gallery-list";
import React from "react";

const MediaGalleryCreatePage = ({ mediaGalleryData, licensesList }) => (
  <MediaGalleryUploadComponent mediaGalleryData={mediaGalleryData} licensesList={licensesList} />
);

export async function getServerSideProps(ctx) {
  const redirect = authorizedPageSSP([ROLES.AUTHORIZED], ctx);

  if (redirect) return redirect;

  const initialFilterParams = { ...DEFAULT_MEDIA_GALLERY_FILTER, ...ctx.query, ...ctx.query.mId };

  const { data } = await axGetMediaGallery(initialFilterParams);

  const { data: licensesList } = await axGetLicenseList();

  return {
    props: {
      mediaGalleryData: {
        id: data.mediaGallery?.id,
        name: data.mediaGallery?.name,
        description: data.mediaGallery?.description,
      },
      licensesList,
    },
  };
}

export default MediaGalleryCreatePage;
