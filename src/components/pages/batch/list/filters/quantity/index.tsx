import NumberRangeFilterPanel from "@components/pages/common/filters/number-range";
import React from "react";

import useBatchFilter from "../../use-batch-filter";

export default function QuantityFilter() {
  const { aggregations } = useBatchFilter();
  const min = aggregations?.aggregationData?.quantity?.min || 0;
  const max = aggregations?.aggregationData?.quantity?.max || 1000;

  return (
    <NumberRangeFilterPanel
      translateKey="filters:farmer.quantity."
      filterKey="quantity"
      min={min}
      max={max}
      useIndexFilter={useBatchFilter}
    />
  );
}
