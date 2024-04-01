import useFarmerMemberFilter from "@components/pages/farmer-member/common/use-farmer-member-filter";
import { DOUCMENT_FILTER_KEY } from "@static/document";
import React from "react";

import MultiSelectSearch from "../shared/multi-select-search";

export default function FarmerNameFilter() {
  return (
    <MultiSelectSearch
      filterKey={"farmerName"}
      filterKeyList={DOUCMENT_FILTER_KEY}
      useIndexFilter={useFarmerMemberFilter}
      translateKey="Farmer Name"
    />
  );
}
