import React from "react";

import useFarmerFilter from "../../use-farmer-filter";
import NumberRangeFilterPanel from "../number-range";

export default function NoOfDependentsFilter() {
  const { farmerListAggregationData } = useFarmerFilter();
  const min = farmerListAggregationData?.aggregationData?.noOfDependents?.min || 0;
  const max = farmerListAggregationData?.aggregationData?.noOfDependents?.max || 1000;

  return (
    <NumberRangeFilterPanel
      translateKey="filters:farmer.no_of_dependents."
      filterKey="noOfDependents"
      min={min}
      max={max}
    />
  );
}
