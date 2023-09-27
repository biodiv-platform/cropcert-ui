import { ResourceFilterProvider } from "@components/pages/resource/common/use-resource-filter";
import ResourceListPageComponent from "@components/pages/resource/list";
import { axGetAllResources } from "@services/media-gallery.service";
import { MEDIA_GALLERY_LIST_PAGINATION_LIMIT } from "@static/media-gallery-list";
import { DEFAULT_RESOURCE_FILTER, RESOURCE_LIST_PAGINATION_LIMIT } from "@static/resource-list";
import React from "react";

function ResourceListPage({ resourceData, initialFilterParams }) {
  return (
    <ResourceFilterProvider filter={initialFilterParams} resourceData={resourceData}>
      <ResourceListPageComponent />
    </ResourceFilterProvider>
  );
}

ResourceListPage.config = {
  footer: false,
};

ResourceListPage.getInitialProps = async (ctx) => {
  const nextOffset =
    (Number(ctx.query.offset) || RESOURCE_LIST_PAGINATION_LIMIT) + RESOURCE_LIST_PAGINATION_LIMIT;

  const initialFilterParams = { ...DEFAULT_RESOURCE_FILTER, ...ctx.query };

  const { data } = await axGetAllResources(initialFilterParams);

  const loader = data.totalCount > MEDIA_GALLERY_LIST_PAGINATION_LIMIT;

  return {
    resourceData: {
      l: data.resourceDataList,
      n: data.totalCount,
      mvp: {},
      hasMore: loader,
    },
    nextOffset,
    initialFilterParams,
  };
};

export default ResourceListPage;
