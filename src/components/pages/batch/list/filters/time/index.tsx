import DateRangeFilter from "@components/pages/common/filters/date-range";
import React from "react";

import useBatchFilter from "../../use-batch-filter";

export default function TimeFilter() {
  return (
    <>
      <DateRangeFilter
        translateKey="filters:time.created_on"
        filterKey="createdAt"
        useIndexFilter={useBatchFilter}
      />
      <DateRangeFilter
        translateKey="filters:time.last_updated"
        filterKey="lastUpdatedAt"
        useIndexFilter={useBatchFilter}
      />
    </>
  );
}
