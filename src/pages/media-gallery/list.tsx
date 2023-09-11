import { MediaGalleryFilterProvider } from "@components/pages/media-gallery/common/use-media-gallery-filter";
import MediaGalleryListPageComponent from "@components/pages/media-gallery/list";
import { axGetMediaGalleryList } from "@services/media-gallery.service";
import {
  DEFAULT_MEDIA_GALLERY_FILTER,
  MEDIA_GALLERY_LIST_PAGINATION_LIMIT,
} from "@static/media-gallery-list";
import React from "react";

function MediaGalleryListPage({ mediaGalleryData, initialFilterParams }) {
  return (
    <MediaGalleryFilterProvider filter={initialFilterParams} mediaGalleryData={mediaGalleryData}>
      <MediaGalleryListPageComponent />
    </MediaGalleryFilterProvider>
  );
}

MediaGalleryListPage.config = {
  footer: false,
};

MediaGalleryListPage.getInitialProps = async (ctx) => {
  const nextOffset =
    (Number(ctx.query.offset) || MEDIA_GALLERY_LIST_PAGINATION_LIMIT) +
    MEDIA_GALLERY_LIST_PAGINATION_LIMIT;

  const initialFilterParams = { ...DEFAULT_MEDIA_GALLERY_FILTER, ...ctx.query };

  const { data } = await axGetMediaGalleryList(initialFilterParams);

  const loader = data.totalCount > MEDIA_GALLERY_LIST_PAGINATION_LIMIT;

  return {
    mediaGalleryData: {
      l: data.mediaListTitles,
      n: data.totalCount,
      mvp: {},
      hasMore: loader,
    },
    nextOffset,
    initialFilterParams,
  };
};

export default MediaGalleryListPage;
