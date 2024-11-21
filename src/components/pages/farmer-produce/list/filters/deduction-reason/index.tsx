import CheckboxFilterPanel from "@components/pages/common/filters/checkbox";
import { convertToUpperCase } from "@utils/text";
import React from "react";

import useFarmerProduceFilter from "../../use-farmer-produce-filter";

export default function DeductionReasonFilter() {
  const { aggregations } = useFarmerProduceFilter();
  const deductionReasonCounts = aggregations?.aggregationData?.deductionReason || {};

  const OPTIONS = Object.keys(deductionReasonCounts)
    .map((val) => ({
      label: convertToUpperCase(val),
      value: val,
      stat: deductionReasonCounts[val],
    }))
    .filter((option) => option.label !== "");

  return (
    <CheckboxFilterPanel
      translateKey="filters:farmer.deduction_reason."
      filterKey="deductionReason"
      statKey="deductionReason"
      skipOptionsTranslation={true}
      showSearch={false}
      options={OPTIONS}
      useIndexFilter={useFarmerProduceFilter}
    />
  );
}
