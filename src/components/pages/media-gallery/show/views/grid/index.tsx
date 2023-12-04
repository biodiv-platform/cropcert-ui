import { Link } from "@chakra-ui/react";
import ImageViewer from "@components/pages/common/image-viewer";
import Loading from "@components/pages/common/loading";
import useMediaGalleryFilter from "@components/pages/media-gallery/common/use-media-gallery-filter";
import styled from "@emotion/styled";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import GridViewCard from "./card";

const GridViewBox = styled.div`
  .grid-card {
    margin-top: 2px;
    display: grid;
    grid-gap: 1.25rem;
    margin-bottom: 1rem;

    @media (min-width: 1441px) {
      grid-template-columns: repeat(5, 1fr);
    }

    @media (max-width: 1440px) {
      grid-template-columns: repeat(4, 1fr);
    }

    @media (max-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 600px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;

const BlurredBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  z-index: 999;
`;

export default function GridView() {
  const { mediaGalleryData, getCheckboxProps, nextPage } = useMediaGalleryFilter();
  const [canEdit] = useState(true);

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const openImageViewer = (index) => {
    setSelectedImageIndex(index);
  };

  const closeImageViewer = () => {
    setSelectedImageIndex(null);
  };

  return mediaGalleryData && Array.isArray(mediaGalleryData.l) ? (
    <GridViewBox className="view_list_minimal">
      <InfiniteScroll
        dataLength={mediaGalleryData.l.length}
        next={nextPage}
        hasMore={mediaGalleryData.hasMore}
        loader={<Loading key={0} />}
        scrollableTarget="items-container"
      >
        <div className="grid-card">
          {mediaGalleryData.l
            .filter((o) => o.resource.type === "IMAGE")
            .map((o, index) => (
              <Link key={o.resourceId} onClick={() => openImageViewer(index)}>
                <GridViewCard o={o} canEdit={canEdit} getCheckboxProps={getCheckboxProps} />
              </Link>
            ))}
        </div>
      </InfiniteScroll>
      {selectedImageIndex !== null && (
        <>
          <BlurredBackground />
          <ImageViewer
            resourceData={mediaGalleryData}
            initialIndex={selectedImageIndex}
            onClose={closeImageViewer}
            loadNextPage={nextPage}
          />
        </>
      )}
    </GridViewBox>
  ) : (
    <Loading />
  );
}
