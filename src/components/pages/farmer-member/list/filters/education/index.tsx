import CheckboxFilterPanel from "@components/pages/common/filters/checkbox";
import { covertToSentenceCase } from "@utils/text";
import React from "react";

import useFarmerFilter from "../../use-farmer-filter";

export default function EducationFilter() {
  const { aggregations } = useFarmerFilter();
  const educationCounts = aggregations?.aggregationData?.levelOfEducation || {};

  const OPTIONS = Object.keys(educationCounts).map((val) => ({
    label: covertToSentenceCase(val),
    value: val,
    stat: educationCounts[val],
  }));

  return (
    <CheckboxFilterPanel
      translateKey="filters:farmer.education."
      filterKey="levelOfEducation"
      statKey="levelOfEducation"
      skipOptionsTranslation={true}
      showSearch={false}
      options={OPTIONS}
      useIndexFilter={useFarmerFilter}
    />
  );
}
