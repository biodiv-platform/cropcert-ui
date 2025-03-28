import React from "react";

import { AccordionRoot } from "@/components/ui/accordion";

import ContainerIdFilter from "./container-id";
import ContainerNameFilter from "./container-name";
import ContainerStatusFilter from "./container-status";
import QuantityFilter from "./quantity";
import TimeFilter from "./time";
import TypeFilter from "./type";

export default function FiltersList() {
  return (
    <AccordionRoot multiple={true} lazyMount>
      <ContainerIdFilter />
      <ContainerNameFilter />
      <TypeFilter />
      <QuantityFilter />
      <ContainerStatusFilter />
      <TimeFilter />
    </AccordionRoot>
  );
}
