import React from "react";

import { AccordionRoot } from "@/components/ui/accordion";

import LotIdFilter from "./lot-id";
import LotNameFilter from "./lot-name";
import LotStatusFilter from "./lot-status";
import QuantityFilter from "./quantity";
import TimeFilter from "./time";
import TypeFilter from "./type";

export default function FiltersList() {
  return (
    <AccordionRoot multiple={true} lazyMount>
      <LotIdFilter />
      <LotNameFilter />
      <TypeFilter />
      <QuantityFilter />
      <LotStatusFilter />
      <TimeFilter />
    </AccordionRoot>
  );
}
