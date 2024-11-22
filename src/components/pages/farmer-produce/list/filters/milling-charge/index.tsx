import NumberRangeFilterPanel from "@components/pages/common/filters/number-range";
import React from "react";

import useFarmerProduceFilter from "../../use-farmer-produce-filter";

export default function MillingChargeFilter() {
  const { aggregations } = useFarmerProduceFilter();
  const min = aggregations?.aggregationData?.millingCharge?.min || 0;
  const max = aggregations?.aggregationData?.millingCharge?.max || 1000;

  return (
    <NumberRangeFilterPanel
      translateKey="filters:farmer.milling_charge."
      filterKey="millingCharge"
      min={min}
      max={max}
      useIndexFilter={useFarmerProduceFilter}
    />
  );
}
