import DateRangeFilter from "@components/pages/common/filters/date-range";
import React from "react";

import useFarmerFilter from "../../use-farmer-filter";

export default function DateOfBirthFilter() {
  return (
    <>
      <DateRangeFilter
        translateKey="Date Of Birth"
        filterKey={"dateOfBirth"}
        useIndexFilter={useFarmerFilter}
      />
    </>
  );
}
