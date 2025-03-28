import DateRangeFilter from "@components/pages/common/filters/date-range";
import React from "react";

import useContainerFilter from "../../use-container-filter";

export default function TimeFilter() {
  return (
    <>
      <DateRangeFilter
        translateKey="filters:time.created_on"
        filterKey="createdAt"
        useIndexFilter={useContainerFilter}
      />
      <DateRangeFilter
        translateKey="filters:time.last_updated"
        filterKey="lastUpdatedAt"
        useIndexFilter={useContainerFilter}
      />
    </>
  );
}
