import FilterMultiSelectPanel from "@components/pages/common/filters/multi-select-search";
import { FARMER_FILTER_KEY } from "@static/constants";
import React from "react";

import useFarmerFilter from "../../use-farmer-filter";

export default function FarmerNameFilter() {
  return (
    <FilterMultiSelectPanel
      filterKey={FARMER_FILTER_KEY.farmerName.filterKey}
      model={FARMER_FILTER_KEY.farmerName.model}
      useIndexFilter={useFarmerFilter}
      translateKey="Farmer Name"
    />
  );
}
