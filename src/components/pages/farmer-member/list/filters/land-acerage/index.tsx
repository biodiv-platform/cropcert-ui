import NumberRangeFilterPanel from "@components/pages/common/filters/number-range";
import React from "react";

import useFarmerFilter from "../../use-farmer-filter";

export default function LandAcerageFilter() {
  const { aggregations } = useFarmerFilter();
  const min = aggregations?.aggregationData?.landAcreage?.min || 0;
  const max = aggregations?.aggregationData?.landAcreage?.max || 1000;

  return (
    <NumberRangeFilterPanel
      translateKey="filters:farmer.land_acerage."
      filterKey="landAcreage"
      min={min}
      max={max}
      useIndexFilter={useFarmerFilter}
    />
  );
}
