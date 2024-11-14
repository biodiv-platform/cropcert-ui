import { BATCH_FILTER_KEY } from "@static/constants";
import React from "react";

import useBatchFilter from "../../use-batch-filter";
import CheckboxFilterPanel from "../shared/multi-select-search";

export default function BatchIdFilter() {
  return (
    <CheckboxFilterPanel
      filterKey={BATCH_FILTER_KEY.batchId.filterKey}
      model={BATCH_FILTER_KEY.batchId.model}
      useIndexFilter={useBatchFilter}
      translateKey="Batch ID"
    />
  );
}
