import { Edit16 } from "@carbon/icons-react";
import { elipsis } from "@utils/basic.util";
import { DATATYPE } from "@utils/constants";
import React from "react";

import timeCell from "../table/time-cell";

export default function EditButton({
  dataType = DATATYPE.DATETIME,
  value,
  onClick,
}) {
  const displayValue = dataType === DATATYPE.DATETIME ? timeCell(value) : value;
  return (
    <span title={displayValue}>
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
