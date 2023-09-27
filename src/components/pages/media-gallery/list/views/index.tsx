import React from "react";

import useMediaGalleryFilter from "../../common/use-media-gallery-filter";
import ListView from "./list";

export default function Views() {
  const {
    filter: { f },
  } = useMediaGalleryFilter();

  switch (f?.view) {
    default:
      return <ListView />;
  }
}
