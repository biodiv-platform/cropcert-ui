import CheckboxFilterPanel from "@components/pages/common/filters/checkbox";
import { convertToUpperCase } from "@utils/text";
import React from "react";

import useBatchFilter from "../../use-batch-filter";

export default function TypeFilter() {
  const { aggregations } = useBatchFilter();
  const typeCounts = aggregations?.aggregationData?.type || {};

  const OPTIONS = Object.keys(typeCounts).map((val) => ({
    label: convertToUpperCase(val),
    value: val,
    stat: typeCounts[val],
  }));

  return (
    <CheckboxFilterPanel
      translateKey="filters:farmer.type."
      filterKey="type"
      statKey="type"
      skipOptionsTranslation={true}
      showSearch={false}
      options={OPTIONS}
      useIndexFilter={useBatchFilter}
    />
  );
}
