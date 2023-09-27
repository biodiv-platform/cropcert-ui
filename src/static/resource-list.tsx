import GridIcon from "@icons/grid";
import { ResourceFilterProps } from "@interfaces/custom";
import React from "react";

export const RESOURCE_LIST_PAGINATION_LIMIT = 20;

export const DEFAULT_RESOURCE_FILTER: ResourceFilterProps = {
  offset: 0,
  limit: RESOURCE_LIST_PAGINATION_LIMIT,
  view: "grid",
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
