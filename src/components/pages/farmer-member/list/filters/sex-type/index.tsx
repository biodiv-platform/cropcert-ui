import CheckboxFilterPanel from "@components/pages/common/filters/checkbox";
import { covertToSentenceCase } from "@utils/text";
import React from "react";

import useFarmerFilter from "../../use-farmer-filter";

export default function SexTypeFilter() {
  const { aggregations } = useFarmerFilter();
  const genderCounts = aggregations?.aggregationData?.gender || {};

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
      useIndexFilter={useFarmerFilter}
    />
  );
}
