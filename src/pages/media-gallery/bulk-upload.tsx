import { authorizedPageSSR } from "@components/auth/auth-redirect";
import MediaGalleryUploadComponent from "@components/pages/media-gallery/upload";
import { axGetLicenseList } from "@services/resources.service";
import { ROLES } from "@static/constants";
import React from "react";

const MediaGalleryUploadPage = ({ licensesList }) => (
  <MediaGalleryUploadComponent licensesList={licensesList} />
);

MediaGalleryUploadPage.getInitialProps = async (ctx) => {
  authorizedPageSSR([ROLES.AUTHORIZED], ctx);

  const { data: licensesList } = await axGetLicenseList();

  return {
    licensesList,
  };
};

export default MediaGalleryUploadPage;
