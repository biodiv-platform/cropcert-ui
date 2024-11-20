import React from "react";

import useFarmerProduceFilter from "../../use-farmer-produce-filter";
import NumberRangeFilterPanel from "../number-range";

export default function DeductionFilter() {
  const { farmerProduceListAggregationData } = useFarmerProduceFilter();
  const min = farmerProduceListAggregationData?.aggregationData?.deduction?.min || 0;
  const max = farmerProduceListAggregationData?.aggregationData?.deduction?.max || 1000;

  return (
    <NumberRangeFilterPanel
      translateKey="filters:farmer.deduction."
      filterKey="deduction"
      min={min}
      max={max}
    />
  );
}
