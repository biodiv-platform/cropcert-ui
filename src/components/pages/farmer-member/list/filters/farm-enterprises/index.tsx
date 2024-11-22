import CheckboxFilterPanel from "@components/pages/common/filters/checkbox";
import { covertToSentenceCase } from "@utils/text";
import React from "react";

import useFarmerFilter from "../../use-farmer-filter";

export default function OtherEnterpriesFilter() {
  const { aggregations } = useFarmerFilter();
  const enterprisesCounts = aggregations?.aggregationData?.otherFarmEnterprises || {};

  const OPTIONS = Object.keys(enterprisesCounts).map((val) => ({
    label: covertToSentenceCase(val),
    value: val,
    stat: enterprisesCounts[val],
  }));

  return (
    <CheckboxFilterPanel
      translateKey="filters:farmer.other_enterprises."
      filterKey="otherFarmEnterprises"
      statKey="otherFarmEnterprises"
      skipOptionsTranslation={true}
      showSearch={false}
      options={OPTIONS}
      useIndexFilter={useFarmerFilter}
    />
  );
}
