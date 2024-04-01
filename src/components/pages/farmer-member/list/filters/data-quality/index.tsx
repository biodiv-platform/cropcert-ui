import React from "react";

import CheckboxFilterPanel from "../shared/checkbox";
import SubAccordion from "../shared/sub-accordion";
import { FLAG } from "./filter-keys";

export default function DataQuality() {
  const FLAG = [
    {
      label: "unflagged",
      value: "false",
      stat: "0",
    },
    {
      label: "flagged",
      value: "true",
      stat: "1",
    },
  ];

  return (
    <SubAccordion>
      <CheckboxFilterPanel
        translateKey="Flag"
        filterKey="isFlagged"
        options={FLAG}
        statKey={"groupFlag"}
        skipOptionsTranslation={true}
      />
    </SubAccordion>
  );
}
