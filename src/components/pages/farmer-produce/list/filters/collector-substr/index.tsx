import { covertToSentenceCase } from "@utils/text";
import React from "react";

import useFarmerProduceFilter from "../../use-farmer-produce-filter";
import CheckboxFilterPanel from "../shared/checkbox";

export default function CollectorSubstrFilter() {
  const { farmerProduceListAggregationData } = useFarmerProduceFilter();
  const collectorSubstrCounts =
    farmerProduceListAggregationData?.aggregationData?.collectorSubstr || {};

  const OPTIONS = Object.keys(collectorSubstrCounts)
    .map((val) => ({
      label: covertToSentenceCase(val),
      value: val,
      stat: collectorSubstrCounts[val],
    }))
    .filter((option) => option.label !== "");

  return (
    <CheckboxFilterPanel
      translateKey="filters:farmer.collector_substr."
      filterKey="collectorSubstr"
      statKey="collectorSubstr"
      skipOptionsTranslation={true}
      showSearch={false}
      options={OPTIONS}
    />
  );
}
