import { BATCH_FILTER_KEY } from "@static/constants";
import React from "react";

import useBatchFilter from "../../use-batch-filter";
import CheckboxFilterPanel from "../shared/multi-select-search";

export default function BatchNameFilter() {
  return (
    <CheckboxFilterPanel
      filterKey={BATCH_FILTER_KEY.batchName.filterKey}
      model={BATCH_FILTER_KEY.batchName.model}
      useIndexFilter={useBatchFilter}
      translateKey="Batch Name"
    />
  );
}
