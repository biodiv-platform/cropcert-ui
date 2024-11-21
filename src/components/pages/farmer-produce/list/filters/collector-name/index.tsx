import CheckboxFilterPanel from "@components/pages/common/filters/checkbox";
import { covertToSentenceCase } from "@utils/text";
import React from "react";

import useFarmerProduceFilter from "../../use-farmer-produce-filter";

export default function CollectorNameFilter() {
  const { aggregations } = useFarmerProduceFilter();
  const collectorNameCounts = aggregations?.aggregationData?.collectorName || {};

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
      useIndexFilter={useFarmerProduceFilter}
    />
  );
}
