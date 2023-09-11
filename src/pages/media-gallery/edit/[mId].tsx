import { authorizedPageSSR, throwUnauthorized } from "@components/auth/auth-redirect";
import MediaGalleryEditComponent from "@components/pages/media-gallery/edit";
import { axGetMediaGalleryById } from "@services/media-gallery.service";
import { axGetLicenseList } from "@services/resources.service";
import { ROLES } from "@static/constants";
import React from "react";

const MediaGalleryEditPage = ({ mediaGallery, mId, licensesList }) => (
  <MediaGalleryEditComponent mediaGallery={mediaGallery} mId={mId} licensesList={licensesList} />
);

MediaGalleryEditPage.getInitialProps = async (ctx) => {
  authorizedPageSSR([ROLES.ADMIN], ctx, true);

  const { success, data } = await axGetMediaGalleryById(ctx.query.mId);

  const { data: licensesList } = await axGetLicenseList();

  if (success) {
    return {
      licensesList,
      mediaGallery: data,
      mId: ctx.query.mId,
    };
  } else {
    throwUnauthorized(ctx);
  }
};

export default MediaGalleryEditPage;
