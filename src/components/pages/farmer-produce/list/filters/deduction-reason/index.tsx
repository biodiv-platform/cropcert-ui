import { convertToUpperCase } from "@utils/text";
import React from "react";

import useFarmerProduceFilter from "../../use-farmer-produce-filter";
import CheckboxFilterPanel from "../shared/checkbox";

export default function DeductionReasonFilter() {
  const { farmerProduceListAggregationData } = useFarmerProduceFilter();
  const deductionReasonCounts =
    farmerProduceListAggregationData?.aggregationData?.deductionReason || {};

  const OPTIONS = Object.keys(deductionReasonCounts).map((val) => ({
    label: convertToUpperCase(val),
    value: val,
    stat: deductionReasonCounts[val],
  }));

  return (
    <CheckboxFilterPanel
      translateKey="filters:farmer.deduction_reason."
      filterKey="deductionReason"
      statKey="deductionReason"
      skipOptionsTranslation={true}
      showSearch={false}
      options={OPTIONS}
    />
  );
}
