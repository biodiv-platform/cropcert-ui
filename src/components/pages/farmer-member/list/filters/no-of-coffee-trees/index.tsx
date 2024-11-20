import React from "react";

import useFarmerFilter from "../../use-farmer-filter";
import NumberRangeFilterPanel from "../number-range";

export default function NoOfCoffeeTreesFilter() {
  const { farmerListAggregationData } = useFarmerFilter();
  const min = farmerListAggregationData?.aggregationData?.noOfCoffeeTrees?.min || 0;
  const max = farmerListAggregationData?.aggregationData?.noOfCoffeeTrees?.max || 1000;

  return (
    <NumberRangeFilterPanel
      translateKey="filters:farmer.no_of_coffee_trees."
      filterKey="noOfCoffeeTrees"
      min={min}
      max={max}
    />
  );
}
