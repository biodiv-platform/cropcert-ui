import React from "react";

import DateRangeFilter from "../shared/date-range";

export default function TimeFilter() {
  return (
    <>
      <DateRangeFilter
        translateKey="filters:time.created_on"
        filterKey="createdAt"
      />
      <DateRangeFilter
        translateKey="filters:time.last_updated"
        filterKey="lastUpdatedAt"
      />
    </>
  );
}
