import React from "react";

import useFarmerProduceFilter from "../../use-farmer-produce-filter";
import NumberRangeFilterPanel from "../number-range";

export default function MillingChargeFilter() {
  const { farmerProduceListAggregationData } = useFarmerProduceFilter();
  const min = farmerProduceListAggregationData?.aggregationData?.millingCharge?.min || 0;
  const max = farmerProduceListAggregationData?.aggregationData?.millingCharge?.max || 1000;

  return (
    <NumberRangeFilterPanel
      translateKey="filters:farmer.milling_charge."
      filterKey="millingCharge"
      min={min}
      max={max}
    />
  );
}
