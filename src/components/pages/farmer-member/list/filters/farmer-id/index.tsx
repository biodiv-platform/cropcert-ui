import FilterMultiSelectPanel from "@components/pages/common/filters/multi-select-search";
import { FARMER_FILTER_KEY } from "@static/constants";
import React from "react";

import useFarmerFilter from "../../use-farmer-filter";

export default function FarmerIdFilter() {
  return (
    <FilterMultiSelectPanel
      filterKey={FARMER_FILTER_KEY.farmerId.filterKey}
      model={FARMER_FILTER_KEY.farmerId.model}
      useIndexFilter={useFarmerFilter}
      translateKey="Farmer ID"
    />
  );
}
