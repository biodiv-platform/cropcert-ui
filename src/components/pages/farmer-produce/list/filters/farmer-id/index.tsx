import { FARMER_PRODUCE_FILTER_KEY } from "@static/constants";
import React from "react";

import useFarmerProduceFilter from "../../use-farmer-produce-filter";
import CheckboxFilterPanel from "../shared/multi-select-search";

export default function FarmerIdFilter() {
  return (
    <CheckboxFilterPanel
      filterKey={FARMER_PRODUCE_FILTER_KEY.farmerId.filterKey}
      model={FARMER_PRODUCE_FILTER_KEY.farmerId.model}
      useIndexFilter={useFarmerProduceFilter}
      translateKey="Farmer ID"
    />
  );
}
