import { authorizedPageSSR } from "@components/auth/auth-redirect";
import ResourceCreatePageComponent from "@components/pages/resource/create";
import { axGetLicenseList } from "@services/resources.service";
import { ROLES } from "@static/constants";
import React from "react";

const ResourceCreatePage = ({ licensesList }) => (
  <ResourceCreatePageComponent licensesList={licensesList} />
);

ResourceCreatePage.getInitialProps = async (ctx) => {
  authorizedPageSSR([ROLES.AUTHORIZED], ctx);

  const { data: licensesList } = await axGetLicenseList();

  return {
    licensesList,
  };
};

export default ResourceCreatePage;
