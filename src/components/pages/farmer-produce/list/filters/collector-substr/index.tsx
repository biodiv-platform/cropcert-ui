import CheckboxFilterPanel from "@components/pages/common/filters/checkbox";
import { covertToSentenceCase } from "@utils/text";
import React from "react";

import useFarmerProduceFilter from "../../use-farmer-produce-filter";

export default function CollectorSubstrFilter() {
  const { aggregations } = useFarmerProduceFilter();
  const collectorSubstrCounts = aggregations?.aggregationData?.collectorSubstr || {};

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
      useIndexFilter={useFarmerProduceFilter}
    />
  );
}
