import CheckboxFilterPanel from "@components/pages/common/filters/checkbox";
import { convertToUpperCase } from "@utils/text";
import React from "react";

import useLotFilter from "../../use-lot-filter";

export default function LotStatusFilter() {
  const { aggregations } = useLotFilter();
  const lotStatusCounts = aggregations?.aggregationData?.lotStatus || {};

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
      useIndexFilter={useLotFilter}
    />
  );
}
