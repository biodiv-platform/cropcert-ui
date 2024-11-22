import NumberRangeFilterPanel from "@components/pages/common/filters/number-range";
import React from "react";

import useFarmerFilter from "../../use-farmer-filter";

export default function NoOfFarmPlotsFilter() {
  const { aggregations } = useFarmerFilter();
  const min = aggregations?.aggregationData?.noOfFarmPlots?.min || 0;
  const max = aggregations?.aggregationData?.noOfFarmPlots?.max || 1000;

  return (
    <NumberRangeFilterPanel
      translateKey="filters:farmer.no_of_farm_plots."
      filterKey="noOfFarmPlots"
      min={min}
      max={max}
      useIndexFilter={useFarmerFilter}
    />
  );
}
