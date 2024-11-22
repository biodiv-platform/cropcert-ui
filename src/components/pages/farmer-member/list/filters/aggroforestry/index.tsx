import CheckboxFilterPanel from "@components/pages/common/filters/checkbox";
import React from "react";

import useFarmerFilter from "../../use-farmer-filter";

export default function AggroforestryFilter() {
  const { aggregations } = useFarmerFilter();
  const agroforestryCounts = aggregations?.aggregationData?.agroforestry || {};

  const defaultOptions = {
    yes: 0,
    no: 0,
    ...agroforestryCounts,
  };

  const OPTIONS = Object.entries(defaultOptions).map(([key, count]) => ({
    label: key === "yes" ? "Yes" : "No",
    value: key,
    stat: count,
  }));

  return (
    <CheckboxFilterPanel
      translateKey="filters:farmer.aggroforestry."
      filterKey="agroforestry"
      statKey="agroforestry"
      skipOptionsTranslation={true}
      showSearch={false}
      options={OPTIONS}
      useIndexFilter={useFarmerFilter}
    />
  );
}
