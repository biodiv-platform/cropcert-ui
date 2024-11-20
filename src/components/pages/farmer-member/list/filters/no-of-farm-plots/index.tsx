import React from "react";

import useFarmerFilter from "../../use-farmer-filter";
import NumberRangeFilterPanel from "../number-range";

export default function NoOfFarmPlotsFilter() {
  const { farmerListAggregationData } = useFarmerFilter();
  const min = farmerListAggregationData?.aggregationData?.noOfFarmPlots?.min || 0;
  const max = farmerListAggregationData?.aggregationData?.noOfFarmPlots?.max || 1000;

  return (
    <NumberRangeFilterPanel
      translateKey="filters:farmer.no_of_farm_plots."
      filterKey="noOfFarmPlots"
      min={min}
      max={max}
    />
  );
}
