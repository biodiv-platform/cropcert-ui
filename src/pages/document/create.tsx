import { authorizedPageSSR } from "@components/auth/auth-redirect";
import DocumentCreatePageComponent from "@components/pages/document/create";
import { axGetDocumentTypes } from "@services/document.service";
import { axGetLicenseList } from "@services/resources.service";
import { ROLES } from "@static/constants";
import React from "react";

const DocumentCreatePage = ({ documentTypes, licensesList }) => (
  <DocumentCreatePageComponent documentTypes={documentTypes} licensesList={licensesList} />
);

DocumentCreatePage.getInitialProps = async (ctx) => {
  authorizedPageSSR([ROLES.AUTHORIZED], ctx);

  const { data: licensesList } = await axGetLicenseList();
  const { data: documentTypes } = await axGetDocumentTypes();

  return {
    documentTypes,
    licensesList,
  };
};

export default DocumentCreatePage;
