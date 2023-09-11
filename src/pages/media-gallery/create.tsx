import { authorizedPageSSR } from "@components/auth/auth-redirect";
import MediaGalleryCreatePageComponent from "@components/pages/media-gallery/create";
import { axGetLicenseList } from "@services/resources.service";
import { ROLES } from "@static/constants";
import React from "react";

const MediaGalleryCreatePage = ({ licensesList }) => (
  <MediaGalleryCreatePageComponent licensesList={licensesList} />
);

MediaGalleryCreatePage.getInitialProps = async (ctx) => {
  authorizedPageSSR([ROLES.ADMIN], ctx);

  const { data: licensesList } = await axGetLicenseList();

  return {
    licensesList,
  };
};

export default MediaGalleryCreatePage;
