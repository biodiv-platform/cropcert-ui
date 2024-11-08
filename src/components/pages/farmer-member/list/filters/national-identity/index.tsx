import { FARMER_FILTER_KEY } from "@static/constants";
import React from "react";

import useFarmerFilter from "../../use-farmer-filter";
import FilterMultiSelectPanel from "../shared/multi-select-search";

export default function NationalIdentityNumberFilter() {
  return (
    <FilterMultiSelectPanel
      filterKey={FARMER_FILTER_KEY.nationalIdentityNumber.filterKey}
      model={FARMER_FILTER_KEY.nationalIdentityNumber.model}
      useIndexFilter={useFarmerFilter}
      translateKey="filters:user.nationalIdentityNumber"
    />
  );
}
