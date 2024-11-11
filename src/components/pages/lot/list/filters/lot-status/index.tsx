import { convertToUpperCase } from "@utils/text";
import React from "react";

import useLotFilter from "../../use-lot-filter";
import CheckboxFilterPanel from "../shared/checkbox";

export default function LotStatusFilter() {
  const { lotListAggregationData } = useLotFilter();
  const lotStatusCounts = lotListAggregationData?.aggregationData?.lotStatus || {};

  const OPTIONS = Object.keys(lotStatusCounts).map((val) => ({
    label: convertToUpperCase(val),
    value: val,
    stat: lotStatusCounts[val],
  }));

  return (
    <CheckboxFilterPanel
      translateKey="filters:farmer.lot_status."
      filterKey="lotStatus"
      statKey="lotStatus"
      skipOptionsTranslation={true}
      showSearch={false}
      options={OPTIONS}
    />
  );
}
