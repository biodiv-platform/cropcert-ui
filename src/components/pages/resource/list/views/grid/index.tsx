import ImageViewer from "@components/pages/common/image-viewer";
import Loading from "@components/pages/common/loading";
import useResourceFilter from "@components/pages/resource/common/use-resource-filter";
import styled from "@emotion/styled";
import useGlobalState from "@hooks/use-global-state";
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
`;

export default function GridView() {
  const { resourceData, getCheckboxProps, nextPage } = useResourceFilter();
  const { isLoggedIn } = useGlobalState();

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const closeImageViewer = () => {
    setSelectedImageIndex(null);
  };

  return resourceData && Array.isArray(resourceData.l) ? (
    <GridViewBox className="view_list_minimal">
      <InfiniteScroll
        dataLength={resourceData.l.length}
        next={nextPage}
        hasMore={resourceData.hasMore}
        loader={<Loading key={0} />}
        scrollableTarget="items-container"
      >
        <div className="grid-card">
          {resourceData.l
            .filter((o) => o.resource.type === "IMAGE")
            .map((o, index) => (
                <GridViewCard
                  o={o}
                  canEdit={isLoggedIn}
                  getCheckboxProps={getCheckboxProps}
                  index={index}
                  setSelectedImageIndex={setSelectedImageIndex}
                />
            ))}
        </div>
      </InfiniteScroll>

      {selectedImageIndex !== null && (
        <>
          <BlurredBackground />
          <ImageViewer
            resourceData={resourceData}
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
