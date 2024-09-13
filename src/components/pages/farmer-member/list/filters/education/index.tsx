import { covertToSentenceCase } from "@utils/text";
import React from "react";

import useFarmerFilter from "../../use-farmer-filter";
import CheckboxFilterPanel from "../shared/checkbox";

export default function EducationFilter() {
  const { farmerListAggregationData } = useFarmerFilter();
  const educationCounts = farmerListAggregationData?.aggregationData?.educationCounts || {};

  const OPTIONS = Object.keys(educationCounts).map((val) => ({
    label: covertToSentenceCase(val),
    value: val,
    stat: educationCounts[val],
  }));

  return (
    <CheckboxFilterPanel
      translateKey="filters:farmer.education."
      filterKey="levelOfEducation"
      statKey="educationCounts"
      skipOptionsTranslation={true}
      showSearch={false}
      options={OPTIONS}
    />
  );
}
