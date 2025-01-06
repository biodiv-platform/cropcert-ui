import React from "react";

import CheckboxFilterPanel from "@/components/pages/common/filters/checkbox";

import useDocumentFilter from "../../../common/use-document-filter";
import SubAccordion from "../shared/sub-accordion";
import { FLAG } from "./filter-keys";

export default function DataQuality() {
  return (
    <SubAccordion>
      <CheckboxFilterPanel
        translateKey="filters:data_quality.flag."
        filterKey="isFlagged"
        options={FLAG}
        statKey={"groupFlag"}
        useIndexFilter={useDocumentFilter}
      />
    </SubAccordion>
  );
}
