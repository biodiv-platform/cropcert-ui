import { FARMER_FILTER_KEY } from "@static/constants";
import React from "react";

import useFarmerFilter from "../../use-farmer-filter";
import CheckboxFilterPanel from "../shared/multi-select-search";

export default function PhoneNumberFilter() {
  return (
    <CheckboxFilterPanel
      filterKey={FARMER_FILTER_KEY.contactNumber.filterKey}
      model={FARMER_FILTER_KEY.contactNumber.model}
      useIndexFilter={useFarmerFilter}
      translateKey="filters:user.phone"
    />
  );
}
