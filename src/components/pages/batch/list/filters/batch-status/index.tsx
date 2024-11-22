import CheckboxFilterPanel from "@components/pages/common/filters/checkbox";
import { covertToSentenceCase } from "@utils/text";
import React from "react";

import useBatchFilter from "../../use-batch-filter";
// import CheckboxFilterPanel from "../shared/checkbox";

export default function BatchStatusFilter() {
  const { aggregations } = useBatchFilter();
  const batchStatusCounts = aggregations?.aggregationData?.batchStatus || {};

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
      useIndexFilter={useBatchFilter}
    />
  );
}
