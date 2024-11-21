import NumberRangeFilterPanel from "@components/pages/common/filters/number-range";
import React from "react";

import useFarmerProduceFilter from "../../use-farmer-produce-filter";

export default function NoOfBagsFilter() {
  const { aggregations } = useFarmerProduceFilter();
  const min = aggregations?.aggregationData?.noOfBags?.min || 0;
  const max = aggregations?.aggregationData?.noOfBags?.max || 1000;

  return (
    <NumberRangeFilterPanel
      translateKey="filters:farmer.no_of_bags."
      filterKey="noOfBags"
      min={min}
      max={max}
      useIndexFilter={useFarmerProduceFilter}
    />
  );
}
