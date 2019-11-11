import { Edit16 } from "@carbon/icons-react";
import { elipsis, formattedTimeStamp } from "@utils/basic.util";
import { DATATYPE } from "@utils/constants";
import React from "react";

import timeCell from "../table/time-cell";

export default function EditButton({
  dataType = DATATYPE.DATETIME,
  value,
  onClick,
}) {
  const displayValue = dataType === DATATYPE.DATETIME ? timeCell(value) : value;
  const title =
    dataType === DATATYPE.DATETIME ? formattedTimeStamp(value) : value;

  return (
    <span title={title} className={dataType}>
      {elipsis(displayValue)}
      <button
        className="eco--btn-transparent"
        aria-label="Edit"
        onClick={onClick}
      >
        <Edit16 />
      </button>
    </span>
  );
}
