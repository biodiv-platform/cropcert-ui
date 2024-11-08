import { covertToSentenceCase } from "@utils/text";
import React from "react";

import useBatchFilter from "../../use-batch-filter";
import CheckboxFilterPanel from "../shared/checkbox";

export default function BatchStatusFilter() {
  const { batchListAggregationData } = useBatchFilter();
  const batchStatusCounts = batchListAggregationData?.aggregationData?.batchStatus || {};

  const OPTIONS = Object.keys(batchStatusCounts).map((val) => ({
    label: covertToSentenceCase(val),
    value: val,
    stat: batchStatusCounts[val],
  }));

  return (
    <CheckboxFilterPanel
      translateKey="filters:farmer.batch_status."
      filterKey="batchStatus"
      statKey="batchStatus"
      skipOptionsTranslation={true}
      showSearch={false}
      options={OPTIONS}
    />
  );
}
