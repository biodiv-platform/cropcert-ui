import DateRangeFilter from "@components/pages/common/filters/date-range";
import React from "react";

import useFarmerProduceFilter from "../../use-farmer-produce-filter";

export default function TimeFilter() {
  return (
    <>
      <DateRangeFilter
        translateKey="filters:time.collected_on"
        filterKey={"dateOfCollection"}
        useIndexFilter={useFarmerProduceFilter}
      />
      <DateRangeFilter
        translateKey="filters:time.record_created"
        filterKey={"submittedOnODK"}
        useIndexFilter={useFarmerProduceFilter}
      />
      <DateRangeFilter
        translateKey="filters:time.last_updated"
        filterKey={"lastUpdatedAt"}
        useIndexFilter={useFarmerProduceFilter}
      />
    </>
  );
}
