import { Edit16 } from "@carbon/icons-react";
import { DATATYPE } from "@utils/constants";
import React from "react";

import timeCell from "../table/time-cell";

export default function EditButton({
  dataType = DATATYPE.DATETIME,
  value,
  onClick,
}) {
  return (
    <>
      {dataType === DATATYPE.DATETIME ? timeCell(value) : value}
      <button
        className="eco--btn-transparent"
        aria-label="Edit"
        onClick={onClick}
      >
        <Edit16 />
      </button>
    </>
  );
}
