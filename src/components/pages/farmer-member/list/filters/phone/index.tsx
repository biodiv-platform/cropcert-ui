import FilterMultiSelectPanel from "@components/pages/common/filters/multi-select-search";
import { FARMER_FILTER_KEY } from "@static/constants";
import React from "react";

import useFarmerFilter from "../../use-farmer-filter";

export default function PhoneNumberFilter() {
  return (
    <FilterMultiSelectPanel
      filterKey={FARMER_FILTER_KEY.contactNumber.filterKey}
      model={FARMER_FILTER_KEY.contactNumber.model}
      useIndexFilter={useFarmerFilter}
      translateKey="filters:user.phone"
    />
  );
}
