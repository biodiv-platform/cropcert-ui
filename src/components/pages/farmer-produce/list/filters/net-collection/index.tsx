import React from "react";

import useFarmerProduceFilter from "../../use-farmer-produce-filter";
import NumberRangeFilterPanel from "../number-range";

export default function NetCollectionFilter() {
  const { farmerProduceListAggregationData } = useFarmerProduceFilter();
  const min = farmerProduceListAggregationData?.aggregationData?.netCollection?.min || 0;
  const max = farmerProduceListAggregationData?.aggregationData?.netCollection?.max || 1000;

  return (
    <NumberRangeFilterPanel
      translateKey="filters:farmer.net_collection."
      filterKey="netCollection"
      min={min}
      max={max}
    />
  );
}
