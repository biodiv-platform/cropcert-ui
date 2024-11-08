import { FARMER_PRODUCE_FILTER_KEY } from "@static/constants";
import React from "react";

import useFarmerProduceFilter from "../../use-farmer-produce-filter";
import FilterMultiSelectPanel from "../shared/multi-select-search";

export default function PhoneNumberFilter() {
  return (
    <FilterMultiSelectPanel
      filterKey={FARMER_PRODUCE_FILTER_KEY.contactNumber.filterKey}
      model={FARMER_PRODUCE_FILTER_KEY.contactNumber.model}
      useIndexFilter={useFarmerProduceFilter}
      translateKey="filters:user.phone"
    />
  );
}
