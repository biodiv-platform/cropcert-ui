import { covertToSentenceCase } from "@utils/text";
import React from "react";

import useFarmerFilter from "../../use-farmer-filter";
import CheckboxFilterPanel from "../shared/checkbox";

export default function AggroforestryFilter() {
  const { farmerListAggregationData } = useFarmerFilter();
  const agroforestryCounts = farmerListAggregationData?.aggregationData?.agroforestryCounts || {};

  const OPTIONS = Object.keys(agroforestryCounts).map((val) => ({
    label: covertToSentenceCase(val),
    value: val,
    stat: agroforestryCounts[val],
  }));

  return (
    <CheckboxFilterPanel
      translateKey="filters:farmer.aggroforestry."
      filterKey="education"
      statKey="agroforestryCounts"
      skipOptionsTranslation={true}
      showSearch={false}
      options={OPTIONS}
    />
  );
}
