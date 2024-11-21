import NumberRangeFilterPanel from "@components/pages/common/filters/number-range";
import React from "react";

import useFarmerProduceFilter from "../../use-farmer-produce-filter";

export default function AmountPaidCalculateFilter() {
  const { aggregations } = useFarmerProduceFilter();
  const min = aggregations?.aggregationData?.amountPaidCalculate?.min || 0;
  const max = aggregations?.aggregationData?.amountPaidCalculate?.max || 1000;

  return (
    <NumberRangeFilterPanel
      translateKey="filters:farmer.amount_paid_calculate."
      filterKey="amountPaidCalculate"
      min={min}
      max={max}
      useIndexFilter={useFarmerProduceFilter}
    />
  );
}
