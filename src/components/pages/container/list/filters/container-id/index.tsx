import FilterMultiSelectPanel from "@components/pages/common/filters/multi-select-search";
import { CONTAINER_FILTER_KEY } from "@static/constants";
import React from "react";

import useContainerFilter from "../../use-container-filter";

export default function ContainerIdFilter() {
  return (
    <FilterMultiSelectPanel
      filterKey={CONTAINER_FILTER_KEY.containerId.filterKey}
      model={CONTAINER_FILTER_KEY.containerId.model}
      useIndexFilter={useContainerFilter}
      translateKey="Container ID"
    />
  );
}
