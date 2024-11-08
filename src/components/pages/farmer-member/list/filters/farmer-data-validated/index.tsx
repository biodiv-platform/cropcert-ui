import React from "react";

import useFarmerFilter from "../../use-farmer-filter";
import CheckboxFilterPanel from "../shared/checkbox";

export default function FarmerDataValidatedFilter() {
  const { farmerListAggregationData } = useFarmerFilter();
  const isFarmerDataValidatedCounts =
    farmerListAggregationData?.aggregationData?.isFarmerDataValidated || {};

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
    />
  );
}
