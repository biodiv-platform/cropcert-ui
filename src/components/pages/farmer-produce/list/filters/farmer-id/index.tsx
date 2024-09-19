import { FARMER_FILTER_KEY } from "@static/constants";
import React from "react";

import useFarmerProduceFilter from "../../use-farmer-produce-filter";
import CheckboxFilterPanel from "../shared/multi-select-search";

export default function FarmerIdFilter() {
  return (
    <CheckboxFilterPanel
      filterKey={FARMER_FILTER_KEY.farmerId.filterKey}
      filterKeyList={FARMER_FILTER_KEY}
      useIndexFilter={useFarmerProduceFilter}
      translateKey="Farmer ID"
    />
  );
}
