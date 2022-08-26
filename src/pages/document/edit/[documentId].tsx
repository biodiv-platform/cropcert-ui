import { authorizedPageSSR } from "@components/auth/auth-redirect";
import DocumentEditPageComponent from "@components/pages/document/edit";
import {
  axGetDocumentBibFields,
  axGetDocumentTypes,
  axGetEditDocumentById,
} from "@services/document.service";
import { axGetLicenseList } from "@services/resources.service";
import { ROLES } from "@static/constants";
import React from "react";

const DocumentEditPage = (props) =>
  props.initialDocument ? <DocumentEditPageComponent {...props} /> : null;

DocumentEditPage.getInitialProps = async (ctx) => {
  authorizedPageSSR([ROLES.AUTHORIZED], ctx);

  const { data: initialDocument } = await axGetEditDocumentById(ctx, ctx.query.documentId);
  const { data: defaultBibFields } = await axGetDocumentBibFields(ctx.query.documentId);
  const { data: documentTypes } = await axGetDocumentTypes();
  const { data: licensesList } = await axGetLicenseList();

  return {
    initialDocument,
    defaultBibFields,
    documentTypes,
    licensesList,
  };
};

export default DocumentEditPage;
