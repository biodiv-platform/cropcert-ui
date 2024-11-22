import FilterMultiSelectPanel from "@components/pages/common/filters/multi-select-search";
import { LOT_FILTER_KEY } from "@static/constants";
import React from "react";

import useLotFilter from "../../use-lot-filter";

export default function LotIdFilter() {
  return (
    <FilterMultiSelectPanel
      filterKey={LOT_FILTER_KEY.lotId.filterKey}
      model={LOT_FILTER_KEY.lotId.model}
      useIndexFilter={useLotFilter}
      translateKey="Lot ID"
    />
  );
}
