import CheckboxFilterPanel from "@components/pages/common/filters/checkbox";
import { covertToSentenceCase } from "@utils/text";
import React from "react";

import useFarmerProduceFilter from "../../use-farmer-produce-filter";

export default function ProduceStatusFilter() {
  const { aggregations } = useFarmerProduceFilter();
  const produceStatusCounts = aggregations?.aggregationData?.produceStatus || {};

  const OPTIONS = Object.keys(produceStatusCounts).map((val) => ({
    label: covertToSentenceCase(val),
    value: val,
    stat: produceStatusCounts[val],
  }));

  return (
    <CheckboxFilterPanel
      translateKey="filters:farmer.produce_status."
      filterKey="produceStatus"
      statKey="produceStatus"
      skipOptionsTranslation={true}
      showSearch={false}
      options={OPTIONS}
      useIndexFilter={useFarmerProduceFilter}
    />
  );
}
