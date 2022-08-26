import { formattedTimeStamp, utc2local } from "@utils/basic";
import React from "react";

function timeCell(value) {
  return <span className="nobr">{value ? formattedTimeStamp(utc2local(value)) : "NA"}</span>;
}

export default timeCell;
