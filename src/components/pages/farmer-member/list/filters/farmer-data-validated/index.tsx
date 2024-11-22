import CheckboxFilterPanel from "@components/pages/common/filters/checkbox";
import React from "react";

import useFarmerFilter from "../../use-farmer-filter";

export default function FarmerDataValidatedFilter() {
  const { aggregations } = useFarmerFilter();
  const isFarmerDataValidatedCounts = aggregations?.aggregationData?.isFarmerDataValidated || {};

  const defaultOptions = {
    true: 0,
    false: 0,
    ...isFarmerDataValidatedCounts,
  };

  const OPTIONS = Object.entries(defaultOptions).map(([key, count]) => ({
    label: key === "true" ? "Yes" : "No",
    value: key,
    stat: count,
  }));

  return (
    <CheckboxFilterPanel
      translateKey="filters:farmer.data_verified."
      filterKey="isFarmerDataValidated"
      statKey="isFarmerDataValidated"
      skipOptionsTranslation={true}
      showSearch={false}
      options={OPTIONS}
      useIndexFilter={useFarmerFilter}
    />
  );
}
