import { convertToUpperCase } from "@utils/text";
import React from "react";

import useBatchFilter from "../../use-batch-filter";
import CheckboxFilterPanel from "../shared/checkbox";

export default function TypeFilter() {
  const { batchListAggregationData } = useBatchFilter();
  const typeCounts = batchListAggregationData?.aggregationData?.type || {};

  const OPTIONS = Object.keys(typeCounts).map((val) => ({
    label: convertToUpperCase(val),
    value: val,
    stat: typeCounts[val],
  }));

  return (
    <CheckboxFilterPanel
      translateKey="filters:farmer.type."
      filterKey="type"
      statKey="type"
      skipOptionsTranslation={true}
      showSearch={false}
      options={OPTIONS}
    />
  );
}
