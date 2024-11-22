import CheckboxFilterPanel from "@components/pages/common/filters/checkbox";
import useFarmerProduceFilter from "@components/pages/farmer-produce/list/use-farmer-produce-filter";
import { covertToSentenceCase } from "@utils/text";
import React from "react";

export default function LocationVerifiedFilter() {
  const { aggregations } = useFarmerProduceFilter();
  const isLocationVerifiedCounts = aggregations?.aggregationData?.isLocationVerified || {};

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
      useIndexFilter={useFarmerProduceFilter}
    />
  );
}
