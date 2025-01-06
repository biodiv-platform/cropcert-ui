import GridIcon from "@icons/grid";
import { MediaGalleryFilterProps } from "@interfaces/custom";
import React from "react";

export const MEDIA_GALLERY_LIST_PAGINATION_LIMIT = 12;

export const DEFAULT_MEDIA_GALLERY_FILTER: MediaGalleryFilterProps = {
  offset: 0,
  limit: MEDIA_GALLERY_LIST_PAGINATION_LIMIT,
  view: "grid",
  mId:""
};

export const viewTabs = [
  {
    name: "common:list.view_type.grid",
    icon: <GridIcon />,
    key: "grid",
  },
];

export const sortByOptions = [
  {
    name: "common:list.sort_options.last_updated",
    key: "last_revised",
  },
  {
    name: "common:list.sort_options.latest",
    key: "created_on",
  },
  {
    name: "common:list.sort_options.most_viewed",
    key: "visit_count",
  },
];
