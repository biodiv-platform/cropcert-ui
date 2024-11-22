import NumberRangeFilterPanel from "@components/pages/common/filters/number-range";
import React from "react";

import useFarmerProduceFilter from "../../use-farmer-produce-filter";

export default function PricePerKgFilter() {
  const { aggregations } = useFarmerProduceFilter();
  const min = aggregations?.aggregationData?.pricePerKg?.min || 0;
  const max = aggregations?.aggregationData?.pricePerKg?.max || 1000;

  return (
    <NumberRangeFilterPanel
      translateKey="filters:farmer.price_per_kg."
      filterKey="pricePerKg"
      useIndexFilter={useFarmerProduceFilter}
      min={min}
      max={max}
    />
  );
}
