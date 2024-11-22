import FilterMultiSelectPanel from "@components/pages/common/filters/multi-select-search";
import { BATCH_FILTER_KEY } from "@static/constants";
import React from "react";

import useBatchFilter from "../../use-batch-filter";

export default function BatchIdFilter() {
  return (
    <FilterMultiSelectPanel
      filterKey={BATCH_FILTER_KEY.batchId.filterKey}
      model={BATCH_FILTER_KEY.batchId.model}
      useIndexFilter={useBatchFilter}
      translateKey="Batch ID"
    />
  );
}
