import React from "react";

import useBatchFilter from "../../use-batch-filter";
import NumberRangeFilterPanel from "../number-range";

export default function QuantityFilter() {
  const { batchListAggregationData } = useBatchFilter();
  const min = batchListAggregationData?.aggregationData?.quantity?.min || 0;
  const max = batchListAggregationData?.aggregationData?.quantity?.max || 1000;

  return (
    <NumberRangeFilterPanel
      translateKey="filters:farmer.quantity."
      filterKey="quantity"
      min={min}
      max={max}
    />
  );
}
