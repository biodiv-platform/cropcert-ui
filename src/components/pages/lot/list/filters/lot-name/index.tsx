import FilterMultiSelectPanel from "@components/pages/common/filters/multi-select-search";
import { LOT_FILTER_KEY } from "@static/constants";
import React from "react";

import useLotFilter from "../../use-lot-filter";

export default function LotNameFilter() {
  return (
    <FilterMultiSelectPanel
      filterKey={LOT_FILTER_KEY.lotName.filterKey}
      model={LOT_FILTER_KEY.lotName.model}
      useIndexFilter={useLotFilter}
      translateKey="Lot Name"
    />
  );
}
