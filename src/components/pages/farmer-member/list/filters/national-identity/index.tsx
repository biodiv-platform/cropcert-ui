import FilterMultiSelectPanel from "@components/pages/common/filters/multi-select-search";
import { FARMER_FILTER_KEY } from "@static/constants";
import React from "react";

import useFarmerFilter from "../../use-farmer-filter";

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
