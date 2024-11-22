import NumberRangeFilterPanel from "@components/pages/common/filters/number-range";
import React from "react";

import useFarmerFilter from "../../use-farmer-filter";

export default function CoffeeAcerageFilter() {
  const { aggregations } = useFarmerFilter();
  const min = aggregations?.aggregationData?.coffeeAcreage?.min || 0;
  const max = aggregations?.aggregationData?.coffeeAcreage?.max || 1000;

  return (
    <NumberRangeFilterPanel
      translateKey="filters:farmer.coffee_acerage."
      filterKey="coffeeAcreage"
      min={min}
      max={max}
      useIndexFilter={useFarmerFilter}
    />
  );
}
