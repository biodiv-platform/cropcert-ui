import { FARMER_FILTER_KEY } from "@static/constants";
import React from "react";

import useFarmerFilter from "../../use-farmer-filter";
import CheckboxFilterPanel from "../shared/multi-select-search";

export default function FarmerIdFilter() {
  return (
    <CheckboxFilterPanel
      filterKey={FARMER_FILTER_KEY.farmerId.filterKey}
      filterKeyList={FARMER_FILTER_KEY}
      useIndexFilter={useFarmerFilter}
      translateKey="Farmer ID"
    />
  );
}
