import NumberRangeFilterPanel from "@components/pages/common/filters/number-range";
import React from "react";

import useFarmerFilter from "../../use-farmer-filter";

export default function NoOfCoffeeTreesFilter() {
  const { aggregations } = useFarmerFilter();
  const min = aggregations?.aggregationData?.noOfCoffeeTrees?.min || 0;
  const max = aggregations?.aggregationData?.noOfCoffeeTrees?.max || 1000;

  return (
    <NumberRangeFilterPanel
      translateKey="filters:farmer.no_of_coffee_trees."
      filterKey="noOfCoffeeTrees"
      min={min}
      max={max}
      useIndexFilter={useFarmerFilter}
    />
  );
}
