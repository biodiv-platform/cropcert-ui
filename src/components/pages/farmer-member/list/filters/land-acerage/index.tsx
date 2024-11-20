import React from "react";

import useFarmerFilter from "../../use-farmer-filter";
import NumberRangeFilterPanel from "../number-range";

export default function LandAcerageFilter() {
  const { farmerListAggregationData } = useFarmerFilter();
  const min = farmerListAggregationData?.aggregationData?.landAcreage?.min || 0;
  const max = farmerListAggregationData?.aggregationData?.landAcreage?.max || 1000;

  return (
    <NumberRangeFilterPanel
      translateKey="filters:farmer.land_acerage."
      filterKey="landAcreage"
      min={min}
      max={max}
    />
  );
}
