import NumberRangeFilterPanel from "@components/pages/common/filters/number-range";
import React from "react";

import useFarmerFilter from "../../use-farmer-filter";

export default function NoOfDependentsFilter() {
  const { aggregations } = useFarmerFilter();
  const min = aggregations?.aggregationData?.noOfDependents?.min || 0;
  const max = aggregations?.aggregationData?.noOfDependents?.max || 1000;

  return (
    <NumberRangeFilterPanel
      translateKey="filters:farmer.no_of_dependents."
      filterKey="noOfDependents"
      min={min}
      max={max}
      useIndexFilter={useFarmerFilter}
    />
  );
}
