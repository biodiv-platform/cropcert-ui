import React from "react";

import useFarmerProduceFilter from "../../use-farmer-produce-filter";
import NumberRangeFilterPanel from "../number-range";

export default function NoOfBagsFilter() {
  const { farmerProduceListAggregationData } = useFarmerProduceFilter();
  const min = farmerProduceListAggregationData?.aggregationData?.noOfBags?.min || 0;
  const max = farmerProduceListAggregationData?.aggregationData?.noOfBags?.max || 1000;

  return (
    <NumberRangeFilterPanel
      translateKey="filters:farmer.no_of_bags."
      filterKey="noOfBags"
      min={min}
      max={max}
    />
  );
}
