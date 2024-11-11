import { convertToUpperCase } from "@utils/text";
import React from "react";

import useLotFilter from "../../use-lot-filter";
import CheckboxFilterPanel from "../shared/checkbox";

export default function TypeFilter() {
  const { lotListAggregationData } = useLotFilter();
  const typeCounts = lotListAggregationData?.aggregationData?.type || {};

  const OPTIONS = Object.keys(typeCounts).map((val) => ({
    label: convertToUpperCase(val),
    value: val,
    stat: typeCounts[val],
  }));

  return (
    <CheckboxFilterPanel
      translateKey="filters:farmer.type."
      filterKey="type"
      statKey="type"
      skipOptionsTranslation={true}
      showSearch={false}
      options={OPTIONS}
    />
  );
}
