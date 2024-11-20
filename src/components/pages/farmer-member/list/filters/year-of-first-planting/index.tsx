import React from "react";

import useFarmerFilter from "../../use-farmer-filter";
import NumberRangeFilterPanel from "../number-range";

export default function YearOfFirstPlantingFilter() {
  const { farmerListAggregationData } = useFarmerFilter();
  const min = farmerListAggregationData?.aggregationData?.yearOfFirstPlanting?.min || 0;
  const max = farmerListAggregationData?.aggregationData?.yearOfFirstPlanting?.max || 1000;

  return (
    <NumberRangeFilterPanel
      translateKey="filters:farmer.year_of_first_planting."
      filterKey="yearOfFirstPlanting"
      min={min}
      max={max}
    />
  );
}
