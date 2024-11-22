import FilterMultiSelectPanel from "@components/pages/common/filters/multi-select-search";
import { BATCH_FILTER_KEY } from "@static/constants";
import React from "react";

import useBatchFilter from "../../use-batch-filter";

export default function BatchNameFilter() {
  return (
    <FilterMultiSelectPanel
      filterKey={BATCH_FILTER_KEY.batchName.filterKey}
      model={BATCH_FILTER_KEY.batchName.model}
      useIndexFilter={useBatchFilter}
      translateKey="Batch Name"
    />
  );
}
