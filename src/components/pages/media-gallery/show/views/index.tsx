import Loading from "@components/pages/common/loading";
import React, { Suspense } from "react";

import useMediaGalleryFilter from "../../common/use-media-gallery-filter";
import GridView from "./grid";

export default function Views() {
  const { filter } = useMediaGalleryFilter();

  switch (filter?.view) {
    case "grid":
      return (
        <Suspense fallback={<Loading />}>
          <GridView />
        </Suspense>
      );

    default:
      return null;
  }
}
