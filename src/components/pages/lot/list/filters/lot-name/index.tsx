import { LOT_FILTER_KEY } from "@static/constants";
import React from "react";

import useLotFilter from "../../use-lot-filter";
import CheckboxFilterPanel from "../shared/multi-select-search";

export default function LotNameFilter() {
  return (
    <CheckboxFilterPanel
      filterKey={LOT_FILTER_KEY.lotName.filterKey}
      filterKeyList={LOT_FILTER_KEY}
      useIndexFilter={useLotFilter}
      translateKey="Lot Name"
    />
  );
}
