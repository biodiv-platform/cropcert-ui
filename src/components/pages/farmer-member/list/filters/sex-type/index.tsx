import { covertToSentenceCase } from "@utils/text";
import React from "react";

import useFarmerFilter from "../../use-farmer-filter";
import CheckboxFilterPanel from "../shared/checkbox";

export default function SexTypeFilter() {
  const { farmerListAggregationData } = useFarmerFilter();
  const genderCounts = farmerListAggregationData?.aggregationData?.gender || {};

  const OPTIONS = Object.keys(genderCounts).map((val) => ({
    label: covertToSentenceCase(val),
    value: val,
    stat: genderCounts[val],
  }));

  return (
    <CheckboxFilterPanel
      translateKey="filters:user.sex_"
      filterKey="gender"
      statKey="gender"
      skipOptionsTranslation={true}
      showSearch={false}
      options={OPTIONS}
    />
  );
}
