import React from "react";

import useFarmerFilter from "../../use-farmer-filter";
import NumberRangeFilterPanel from "../number-range";

export default function CoffeeAcerageFilter() {
  const { farmerListAggregationData } = useFarmerFilter();
  const min = farmerListAggregationData?.aggregationData?.coffeeAcreage?.min || 0;
  const max = farmerListAggregationData?.aggregationData?.coffeeAcreage?.max || 1000;

  return (
    <NumberRangeFilterPanel
      translateKey="filters:farmer.coffee_acerage."
      filterKey="coffeeAcreage"
      min={min}
      max={max}
    />
  );
}
