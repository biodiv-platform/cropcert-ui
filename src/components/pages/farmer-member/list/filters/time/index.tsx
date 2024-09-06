import React from "react";

import DateRangeFilter from "../shared/date-range";

export default function TimeFilter() {
  return (
    <DateRangeFilter
      translateKey="filters:time.last_updated"
      filterKey={{ min: "lastUpdatedMinDate", max: "lastUpdatedMaxDate" }}
    />
  );
}
