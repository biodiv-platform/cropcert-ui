import { FARMER_FILTER_KEY } from "@static/constants";
import React from "react";

import useFarmerFilter from "../../use-farmer-filter";
import CheckboxFilterPanel from "../shared/multi-select-search";

export default function FarmerNameFilter() {
  return (
    <CheckboxFilterPanel
      filterKey={FARMER_FILTER_KEY.farmerName.filterKey}
      model={FARMER_FILTER_KEY.farmerName.model}
      useIndexFilter={useFarmerFilter}
      translateKey="Farmer Name"
    />
  );
}
