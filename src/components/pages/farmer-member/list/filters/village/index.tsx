import { covertToSentenceCase } from "@utils/text";
import React from "react";

import useFarmerFilter from "../../use-farmer-filter";
import CheckboxFilterPanel from "../shared/checkbox";

export default function VillageFilter() {
  const { farmerListAggregationData } = useFarmerFilter();
  const villageCounts = farmerListAggregationData?.aggregationData?.village || {};

  const OPTIONS = Object.keys(villageCounts).map((val) => ({
    label: covertToSentenceCase(val),
    value: val,
    stat: villageCounts[val],
  }));

  return (
    <CheckboxFilterPanel
      translateKey="filters:farmer.village."
      filterKey="village"
      statKey="village"
      skipOptionsTranslation={true}
      showSearch={true}
      options={OPTIONS}
    />
  );
}
