import CheckboxFilterPanel from "@components/pages/common/filters/checkbox";
import { convertToUpperCase } from "@utils/text";
import React from "react";

import useContainerFilter from "../../use-container-filter";

export default function ContainerStatusFilter() {
  const { aggregations } = useContainerFilter();
  const containerStatusCounts = aggregations?.aggregationData?.containerStatus || {};

  const OPTIONS = Object.keys(containerStatusCounts).map((val) => ({
    label: convertToUpperCase(val),
    value: val,
    stat: containerStatusCounts[val],
  }));

  return (
    <CheckboxFilterPanel
      translateKey="filters:farmer.container_status."
      filterKey="containerStatus"
      statKey="containerStatus"
      skipOptionsTranslation={true}
      showSearch={false}
      options={OPTIONS}
      useIndexFilter={useContainerFilter}
    />
  );
}
