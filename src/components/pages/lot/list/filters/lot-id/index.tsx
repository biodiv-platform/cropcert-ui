import { LOT_FILTER_KEY } from "@static/constants";
import React from "react";

import useLotFilter from "../../use-lot-filter";
import CheckboxFilterPanel from "../shared/multi-select-search";

export default function LotIdFilter() {
  return (
    <CheckboxFilterPanel
      filterKey={LOT_FILTER_KEY.lotId.filterKey}
      model={LOT_FILTER_KEY.lotId.model}
      useIndexFilter={useLotFilter}
      translateKey="Lot ID"
    />
  );
}
