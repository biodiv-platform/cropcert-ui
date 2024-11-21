import CheckboxFilterPanel from "@components/pages/common/filters/checkbox";
import { convertToUpperCase } from "@utils/text";
import React from "react";

import useFarmerProduceFilter from "../../use-farmer-produce-filter";

export default function ProductTypeFilter() {
  const { aggregations } = useFarmerProduceFilter();
  const produceTypeCounts = aggregations?.aggregationData?.produceType || {};

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
      useIndexFilter={useFarmerProduceFilter}
    />
  );
}
