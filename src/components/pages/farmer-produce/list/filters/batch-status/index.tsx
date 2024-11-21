import CheckboxFilterPanel from "@components/pages/common/filters/checkbox";
import { covertToSentenceCase } from "@utils/text";
import React from "react";

import useFarmerProduceFilter from "../../use-farmer-produce-filter";

export default function BatchStatusFilter() {
  const { aggregations } = useFarmerProduceFilter();
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
      useIndexFilter={useFarmerProduceFilter}
    />
  );
}
