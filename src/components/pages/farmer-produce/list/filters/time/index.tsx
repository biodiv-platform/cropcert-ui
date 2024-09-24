import React from "react";

import DateRangeFilter from "../shared/date-range";

export default function TimeFilter() {
  return (
    <>
      <DateRangeFilter translateKey="filters:time.collected_on" filterKey={"dateOfCollection"} />
      <DateRangeFilter translateKey="filters:time.record_created" filterKey={"submittedOnODK"} />
      <DateRangeFilter translateKey="filters:time.last_updated" filterKey={"lastUpdatedAt"} />
    </>
  );
}
