import Loading from "@components/pages/common/loading";
import useMediaGalleryFilter from "@components/pages/media-gallery/common/use-media-gallery-filter";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import Container from "./container";

export default function ListView() {
  const { mediaGalleryListData, nextPage } = useMediaGalleryFilter();

  return (
    <InfiniteScroll
      dataLength={mediaGalleryListData.l.length}
      next={nextPage}
      hasMore={mediaGalleryListData.hasMore}
      loader={<Loading />}
      scrollableTarget="items-container"
    >
      {mediaGalleryListData?.l.map((o) => (
        <Container key={o.id} o={o} />
      ))}
    </InfiniteScroll>
  );
}
