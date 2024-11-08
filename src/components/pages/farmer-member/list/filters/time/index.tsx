import React from "react";

import DateRangeFilter from "../shared/date-range";

export default function TimeFilter() {
  return (
    <>
      <DateRangeFilter translateKey="filters:time.date_of_survey" filterKey={"dateOfSurvey"} />
      <DateRangeFilter translateKey="filters:time.record_created" filterKey={"submittedOnODK"} />
      <DateRangeFilter translateKey="filters:time.last_updated" filterKey={"lastUpdatedAt"} />
    </>
  );
}
