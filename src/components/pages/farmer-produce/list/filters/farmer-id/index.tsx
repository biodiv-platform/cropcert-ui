import FilterMultiSelectPanel from "@components/pages/common/filters/multi-select-search";
import { FARMER_PRODUCE_FILTER_KEY } from "@static/constants";
import React from "react";

import useFarmerProduceFilter from "../../use-farmer-produce-filter";

export default function FarmerIdFilter() {
  return (
    <FilterMultiSelectPanel
      filterKey={FARMER_PRODUCE_FILTER_KEY.farmerId.filterKey}
      model={FARMER_PRODUCE_FILTER_KEY.farmerId.model}
      useIndexFilter={useFarmerProduceFilter}
      translateKey="Farmer ID"
    />
  );
}
