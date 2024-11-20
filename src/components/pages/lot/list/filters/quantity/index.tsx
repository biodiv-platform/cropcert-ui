import React from "react";

import useLotFilter from "../../use-lot-filter";
import NumberRangeFilterPanel from "../number-range";

export default function QuantityFilter() {
  const { lotListAggregationData } = useLotFilter();
  const min = lotListAggregationData?.aggregationData?.quantity?.min || 0;
  const max = lotListAggregationData?.aggregationData?.quantity?.max || 1000;

  return (
    <NumberRangeFilterPanel
      translateKey="filters:farmer.quantity."
      filterKey="quantity"
      min={min}
      max={max}
    />
  );
}
