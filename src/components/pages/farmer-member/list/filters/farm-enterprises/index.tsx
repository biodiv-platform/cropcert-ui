import { covertToSentenceCase } from "@utils/text";
import React from "react";

import useFarmerFilter from "../../use-farmer-filter";
import CheckboxFilterPanel from "../shared/checkbox";

export default function OtherEnterpriesFilter() {
  const { farmerListAggregationData } = useFarmerFilter();
  const enterprisesCounts = farmerListAggregationData?.aggregationData?.enterprisesCounts || {};

  const OPTIONS = Object.keys(enterprisesCounts).map((val) => ({
    label: covertToSentenceCase(val),
    value: val,
    stat: enterprisesCounts[val],
  }));

  return (
    <CheckboxFilterPanel
      translateKey="filters:farmer.other_enterprises."
      filterKey="otherFarmEnterprises"
      statKey="enterprisesCounts"
      skipOptionsTranslation={true}
      showSearch={false}
      options={OPTIONS}
    />
  );
}
