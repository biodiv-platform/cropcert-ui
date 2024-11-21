import NumberRangeFilterPanel from "@components/pages/common/filters/number-range";
import React from "react";

import useFarmerProduceFilter from "../../use-farmer-produce-filter";

export default function DeductionFilter() {
  const { aggregations } = useFarmerProduceFilter();
  const min = aggregations?.aggregationData?.deduction?.min || 0;
  const max = aggregations?.aggregationData?.deduction?.max || 1000;

  return (
    <NumberRangeFilterPanel
      translateKey="filters:farmer.deduction."
      filterKey="deduction"
      min={min}
      max={max}
      useIndexFilter={useFarmerProduceFilter}
    />
  );
}
