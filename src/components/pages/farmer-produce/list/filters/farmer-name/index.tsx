import FilterMultiSelectPanel from "@components/pages/common/filters/multi-select-search";
import { FARMER_PRODUCE_FILTER_KEY } from "@static/constants";
import React from "react";

import useFarmerProduceFilter from "../../use-farmer-produce-filter";

export default function FarmerNameFilter() {
  return (
    <FilterMultiSelectPanel
      filterKey={FARMER_PRODUCE_FILTER_KEY.farmerName.filterKey}
      model={FARMER_PRODUCE_FILTER_KEY.farmerName.model}
      useIndexFilter={useFarmerProduceFilter}
      translateKey="Farmer Name"
    />
  );
}
