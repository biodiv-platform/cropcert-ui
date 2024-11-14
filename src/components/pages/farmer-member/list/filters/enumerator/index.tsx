import { covertToSentenceCase } from "@utils/text";
import React from "react";

import useFarmerFilter from "../../use-farmer-filter";
import CheckboxFilterPanel from "../shared/checkbox";

export default function EnumeratorFilter() {
  const { farmerListAggregationData } = useFarmerFilter();
  const enumeratorCounts = farmerListAggregationData?.aggregationData?.enumerator || {};

  const OPTIONS = Object.keys(enumeratorCounts)
    .map((val) => ({
      label: covertToSentenceCase(val),
      value: val,
      stat: enumeratorCounts[val],
    }))
    .filter((option) => option.label !== "");

  return (
    <CheckboxFilterPanel
      translateKey="filters:farmer.enumerator."
      filterKey="enumerator"
      statKey="enumerator"
      skipOptionsTranslation={true}
      showSearch={false}
      options={OPTIONS}
    />
  );
}
