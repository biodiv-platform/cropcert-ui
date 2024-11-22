import CheckboxFilterPanel from "@components/pages/common/filters/checkbox";
import { covertToSentenceCase } from "@utils/text";
import React from "react";

import useFarmerFilter from "../../use-farmer-filter";

export default function VillageFilter() {
  const { aggregations } = useFarmerFilter();
  const villageCounts = aggregations?.aggregationData?.village || {};

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
      useIndexFilter={useFarmerFilter}
    />
  );
}
