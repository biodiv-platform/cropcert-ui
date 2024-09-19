import { covertToSentenceCase } from "@utils/text";
import React from "react";

import useFarmerProduceFilter from "../../use-farmer-produce-filter";
import CheckboxFilterPanel from "../shared/checkbox";

export default function ProductTypeFilter() {
  const { farmerProduceListAggregationData } = useFarmerProduceFilter();
  const produceTypeCounts = farmerProduceListAggregationData?.aggregationData?.produceType || {};

  const OPTIONS = Object.keys(produceTypeCounts).map((val) => ({
    label: covertToSentenceCase(val),
    value: val,
    stat: produceTypeCounts[val],
  }));

  return (
    <CheckboxFilterPanel
      translateKey="filters:farmer.product_type."
      filterKey="produceType"
      statKey="produceType"
      skipOptionsTranslation={true}
      showSearch={false}
      options={OPTIONS}
    />
  );
}
