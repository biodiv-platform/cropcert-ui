import { DocumentFilterProvider } from "@components/pages/document/common/use-document-filter";
import DocumentListPageComponent from "@components/pages/document/list";
import { axGetListData } from "@services/document.service";
import { DEFAULT_FILTER, LIST_PAGINATION_LIMIT } from "@static/documnet-list";
import React from "react";

function DocumentListPage({ documentData, initialFilterParams, nextOffset }) {
  return (
    <DocumentFilterProvider filter={initialFilterParams} documentData={documentData}>
      <DocumentListPageComponent nextOffset={nextOffset} />
    </DocumentFilterProvider>
  );
}

DocumentListPage.config = {
  footer: false,
};

DocumentListPage.getInitialProps = async (ctx) => {
  const nextOffset = (Number(ctx.query.offset) || LIST_PAGINATION_LIMIT) + LIST_PAGINATION_LIMIT;

  const initialFilterParams = { ...DEFAULT_FILTER, ...ctx.query };
  const { data } = await axGetListData(initialFilterParams);

  return {
    documentData: {
      l: data.documentList,
      n: data.totalCount,
      ag: data.aggregationData,
      mvp: {},
      hasMore: true,
    },
    nextOffset,
    initialFilterParams,
  };
};

export default DocumentListPage;
