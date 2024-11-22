import DateRangeFilter from "@components/pages/common/filters/date-range";
import React from "react";

import useLotFilter from "../../use-lot-filter";

export default function TimeFilter() {
  return (
    <>
      <DateRangeFilter
        translateKey="filters:time.created_on"
        filterKey="createdAt"
        useIndexFilter={useLotFilter}
      />
      <DateRangeFilter
        translateKey="filters:time.last_updated"
        filterKey="lastUpdatedAt"
        useIndexFilter={useLotFilter}
      />
    </>
  );
}
