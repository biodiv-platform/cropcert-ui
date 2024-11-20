import React from "react";

import useFarmerProduceFilter from "../../use-farmer-produce-filter";
import NumberRangeFilterPanel from "../number-range";

export default function QuantityFilter() {
  const { farmerProduceListAggregationData } = useFarmerProduceFilter();
  const min = farmerProduceListAggregationData?.aggregationData?.quantity?.min || 0;
  const max = farmerProduceListAggregationData?.aggregationData?.quantity?.max || 1000;

  return (
    <NumberRangeFilterPanel
      translateKey="filters:farmer.quantity."
      filterKey="quantity"
      min={min}
      max={max}
    />
  );
}
