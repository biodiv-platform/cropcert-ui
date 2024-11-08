import { FARMER_PRODUCE_FILTER_KEY } from "@static/constants";
import React from "react";

import useFarmerProduceFilter from "../../use-farmer-produce-filter";
import FilterMultiSelectPanel from "../shared/multi-select-search";

export default function FarmerProduceIdFilter() {
  return (
    <FilterMultiSelectPanel
      filterKey={FARMER_PRODUCE_FILTER_KEY.farmerProduceId.filterKey}
      model={FARMER_PRODUCE_FILTER_KEY.farmerProduceId.model}
      useIndexFilter={useFarmerProduceFilter}
      translateKey="Farmer Produce ID"
    />
  );
}
