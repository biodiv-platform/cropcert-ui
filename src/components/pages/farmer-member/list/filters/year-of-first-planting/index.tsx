import NumberRangeFilterPanel from "@components/pages/common/filters/number-range";
import React from "react";

import useFarmerFilter from "../../use-farmer-filter";

export default function YearOfFirstPlantingFilter() {
  const { aggregations } = useFarmerFilter();
  const min = aggregations?.aggregationData?.yearOfFirstPlanting?.min || 0;
  const max = aggregations?.aggregationData?.yearOfFirstPlanting?.max || 1000;

  return (
    <NumberRangeFilterPanel
      translateKey="filters:farmer.year_of_first_planting."
      filterKey="yearOfFirstPlanting"
      min={min}
      max={max}
      useIndexFilter={useFarmerFilter}
    />
  );
}
