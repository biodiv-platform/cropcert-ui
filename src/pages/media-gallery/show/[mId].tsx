import { MediaGalleryFilterProvider } from "@components/pages/media-gallery/common/use-media-gallery-filter";
import MediaGalleryShowPageComponent from "@components/pages/media-gallery/show";
import { axGetMediaGallery } from "@services/media-gallery.service";
import {
  DEFAULT_MEDIA_GALLERY_FILTER,
  MEDIA_GALLERY_LIST_PAGINATION_LIMIT,
} from "@static/media-gallery-list";
import React from "react";

function MediaGalleryListPage({ mediaGalleryData, initialFilterParams }) {
  return (
    <MediaGalleryFilterProvider filter={initialFilterParams} mediaGalleryData={mediaGalleryData}>
      <MediaGalleryShowPageComponent />
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

  const { data } = await axGetMediaGallery(initialFilterParams);
  const loader = data.totalCount > MEDIA_GALLERY_LIST_PAGINATION_LIMIT;

  return {
    mediaGalleryData: {
      id: data.mediaGallery?.id,
      name: data.mediaGallery?.name,
      description: data.mediaGallery?.description,
      l: data.mediaGalleryResource,
      n: data.totalCount,
      mvp: {},
      hasMore: loader,
    },
    nextOffset,
    initialFilterParams,
  };
};

export default MediaGalleryListPage;
