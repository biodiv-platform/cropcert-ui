import useFarmerMemberFilter from "@components/pages/farmer-member/common/use-farmer-member-filter";
import { DOUCMENT_FILTER_KEY } from "@static/document";
import React from "react";

import CheckboxFilterPanel from "../shared/multi-select-search";

export default function PublisherFilter() {
  return (
    <CheckboxFilterPanel
      filterKeyList={DOUCMENT_FILTER_KEY}
      filterKey={DOUCMENT_FILTER_KEY.publisher.filterKey}
      useIndexFilter={useFarmerMemberFilter}
      translateKey="document:bib.publisher"
    />
  );
}
