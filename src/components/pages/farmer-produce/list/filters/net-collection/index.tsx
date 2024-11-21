import NumberRangeFilterPanel from "@components/pages/common/filters/number-range";
import React from "react";

import useFarmerProduceFilter from "../../use-farmer-produce-filter";

export default function NetCollectionFilter() {
  const { aggregations } = useFarmerProduceFilter();
  const min = aggregations?.aggregationData?.netCollection?.min || 0;
  const max = aggregations?.aggregationData?.netCollection?.max || 1000;

  return (
    <NumberRangeFilterPanel
      translateKey="filters:farmer.net_collection."
      filterKey="netCollection"
      min={min}
      max={max}
      useIndexFilter={useFarmerProduceFilter}
    />
  );
}
