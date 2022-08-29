import DocumentShowComponent from "@components/pages/document/show";
import { axGetDocumentById } from "@services/document.service";
import React from "react";

const DocumentShowPage = (props) => <DocumentShowComponent {...props} />;

export const getServerSideProps = async (ctx) => {
  const { data: document } = await axGetDocumentById(ctx.query.documentId);

  return { props: { document } };
};

export default DocumentShowPage;
