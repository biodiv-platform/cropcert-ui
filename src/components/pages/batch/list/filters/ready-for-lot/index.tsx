import { covertToSentenceCase } from "@utils/text";
import React from "react";

import useBatchFilter from "../../use-batch-filter";
import CheckboxFilterPanel from "../shared/checkbox";

export default function ReadyForLotFilter() {
  const { batchListAggregationData } = useBatchFilter();
  const isReadyForLotCounts = batchListAggregationData?.aggregationData?.isReadyForLot || {};

  const OPTIONS = Object.keys(isReadyForLotCounts).map((val) => ({
    label: covertToSentenceCase(val),
    value: val,
    stat: isReadyForLotCounts[val],
  }));

  return (
    <CheckboxFilterPanel
      translateKey="filters:farmer.ready_for_lot."
      filterKey="isReadyForLot"
      statKey="isReadyForLot"
      skipOptionsTranslation={true}
      showSearch={false}
      options={OPTIONS}
    />
  );
}
