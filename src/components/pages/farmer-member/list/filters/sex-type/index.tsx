import { covertToSentenceCase } from "@utils/text";
import React from "react";

import useFarmerFilter from "../../use-farmer-filter";
import CheckboxFilterPanel from "../shared/checkbox";

export default function SexTypeFilter() {
  const { farmerListAggregationData } = useFarmerFilter();
  const genderCounts = farmerListAggregationData?.aggregationData?.genderCounts || {};

  const OPTIONS = Object.keys(genderCounts).map((val) => ({
    label: covertToSentenceCase(val),
    value: val,
    stat: genderCounts[val],
  }));

  return (
    <CheckboxFilterPanel
      translateKey="filters:user.sex_"
      filterKey="sex"
      statKey="genderCounts"
      skipOptionsTranslation={true}
      showSearch={false}
      options={OPTIONS}
    />
  );
}
