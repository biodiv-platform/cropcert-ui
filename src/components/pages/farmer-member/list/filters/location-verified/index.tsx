import CheckboxFilterPanel from "@components/pages/common/filters/checkbox";
import React from "react";

import useFarmerFilter from "../../use-farmer-filter";

export default function LocationVerifiedFilter() {
  const { aggregations } = useFarmerFilter();
  const isLocationVerifiedCounts = aggregations?.aggregationData?.isLocationVerified || {};

  const defaultOptions = {
    true: 0,
    false: 0,
    ...isLocationVerifiedCounts,
  };

  const OPTIONS = Object.entries(defaultOptions).map(([key, count]) => ({
    label: key === "true" ? "Yes" : "No",
    value: key,
    stat: count,
  }));

  return (
    <CheckboxFilterPanel
      translateKey="filters:farmer.location_verified."
      filterKey="isLocationVerified"
      statKey="isLocationVerified"
      skipOptionsTranslation={true}
      showSearch={false}
      options={OPTIONS}
      useIndexFilter={useFarmerFilter}
    />
  );
}
