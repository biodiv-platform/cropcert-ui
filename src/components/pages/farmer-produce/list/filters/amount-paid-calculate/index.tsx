import React from "react";

import useFarmerProduceFilter from "../../use-farmer-produce-filter";
import NumberRangeFilterPanel from "../number-range";

export default function AmountPaidCalculateFilter() {
  const { farmerProduceListAggregationData } = useFarmerProduceFilter();
  const min = farmerProduceListAggregationData?.aggregationData?.amountPaidCalculate?.min || 0;
  const max = farmerProduceListAggregationData?.aggregationData?.amountPaidCalculate?.max || 1000;

  return (
    <NumberRangeFilterPanel
      translateKey="filters:farmer.amount_paid_calculate."
      filterKey="amountPaidCalculate"
      min={min}
      max={max}
    />
  );
}
