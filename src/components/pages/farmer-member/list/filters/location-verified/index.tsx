import { covertToSentenceCase } from "@utils/text";
import React from "react";

import useFarmerFilter from "../../use-farmer-filter";
import CheckboxFilterPanel from "../shared/checkbox";

export default function LocationVerifiedFilter() {
  const { farmerListAggregationData } = useFarmerFilter();
  const isLocationVerifiedCounts =
  farmerListAggregationData?.aggregationData?.isLocationVerified || {};

  const OPTIONS = Object.keys(isLocationVerifiedCounts).map((val) => ({
    label: covertToSentenceCase(val),
    value: val,
    stat: isLocationVerifiedCounts[val],
  }));

  return (
    <CheckboxFilterPanel
      translateKey="filters:farmer.location_verified."
      filterKey="isLocationVerified"
      statKey="isLocationVerified"
      skipOptionsTranslation={true}
      showSearch={false}
      options={OPTIONS}
    />
  );
}
