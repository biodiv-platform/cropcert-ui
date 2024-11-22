import DateRangeFilter from "@components/pages/common/filters/date-range";
import React from "react";

import useFarmerFilter from "../../use-farmer-filter";

export default function TimeFilter() {
  return (
    <>
      <DateRangeFilter
        translateKey="filters:time.date_of_survey"
        filterKey={"dateOfSurvey"}
        useIndexFilter={useFarmerFilter}
      />
      <DateRangeFilter
        translateKey="filters:time.record_created"
        filterKey={"submittedOnODK"}
        useIndexFilter={useFarmerFilter}
      />
      <DateRangeFilter
        translateKey="filters:time.last_updated"
        filterKey={"lastUpdatedAt"}
        useIndexFilter={useFarmerFilter}
      />
    </>
  );
}
