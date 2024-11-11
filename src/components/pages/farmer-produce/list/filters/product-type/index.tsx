import { convertToUpperCase } from "@utils/text";
import React from "react";

import useFarmerProduceFilter from "../../use-farmer-produce-filter";
import CheckboxFilterPanel from "../shared/checkbox";

export default function ProductTypeFilter() {
  const { farmerProduceListAggregationData } = useFarmerProduceFilter();
  const produceTypeCounts = farmerProduceListAggregationData?.aggregationData?.produceType || {};

  const OPTIONS = Object.keys(produceTypeCounts).map((val) => ({
    label: convertToUpperCase(val),
    value: val,
    stat: produceTypeCounts[val],
  }));

  return (
    <CheckboxFilterPanel
      translateKey="filters:farmer.type."
      filterKey="produceType"
      statKey="produceType"
      skipOptionsTranslation={true}
      showSearch={false}
      options={OPTIONS}
    />
  );
}
