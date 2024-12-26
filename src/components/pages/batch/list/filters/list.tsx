import React from "react";

import { AccordionRoot } from "@/components/ui/accordion";

import BatchIdFilter from "./Batch-id";
import BatchNameFilter from "./batch-name";
import BatchStatusFilter from "./batch-status";
import QuantityFilter from "./quantity";
import TimeFilter from "./time";
import TypeFilter from "./type";

export default function FiltersList() {
  return (
    <AccordionRoot multiple={true}>
      <BatchIdFilter />
      <BatchNameFilter />
      <QuantityFilter />
      <BatchStatusFilter />
      <TypeFilter />
      <TimeFilter />
    </AccordionRoot>
  );
}
