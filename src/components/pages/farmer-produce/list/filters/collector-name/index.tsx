import { covertToSentenceCase } from "@utils/text";
import React from "react";

import useFarmerProduceFilter from "../../use-farmer-produce-filter";
import CheckboxFilterPanel from "../shared/checkbox";

export default function CollectorNameFilter() {
  const { farmerProduceListAggregationData } = useFarmerProduceFilter();
  const collectorNameCounts =
    farmerProduceListAggregationData?.aggregationData?.collectorName || {};

  const OPTIONS = Object.keys(collectorNameCounts)
    .map((val) => ({
      label: covertToSentenceCase(val),
      value: val,
      stat: collectorNameCounts[val],
    }))
    .filter((option) => option.label !== "");

  return (
    <CheckboxFilterPanel
      translateKey="filters:farmer.collector_name."
      filterKey="collectorName"
      statKey="collectorName"
      skipOptionsTranslation={true}
      showSearch={false}
      options={OPTIONS}
    />
  );
}
