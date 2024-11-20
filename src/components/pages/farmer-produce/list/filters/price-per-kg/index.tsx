import React from "react";

import useFarmerProduceFilter from "../../use-farmer-produce-filter";
import NumberRangeFilterPanel from "../number-range";

export default function PricePerKgFilter() {
  const { farmerProduceListAggregationData } = useFarmerProduceFilter();
  const min = farmerProduceListAggregationData?.aggregationData?.pricePerKg?.min || 0;
  const max = farmerProduceListAggregationData?.aggregationData?.pricePerKg?.max || 1000;

  return (
    <NumberRangeFilterPanel
      translateKey="filters:farmer.price_per_kg."
      filterKey="pricePerKg"
      min={min}
      max={max}
    />
  );
}
