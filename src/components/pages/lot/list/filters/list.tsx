import { Accordion } from "@chakra-ui/react";
import React from "react";

import LotIdFilter from "./lot-id";
import LotNameFilter from "./lot-name";
import LotStatusFilter from "./lot-status";
import QuantityFilter from "./quantity";
import TimeFilter from "./time";
import TypeFilter from "./type";

export default function FiltersList() {
  return (
    <Accordion allowMultiple={true}>
      <LotIdFilter />
      <LotNameFilter />
      <TypeFilter />
      <QuantityFilter />
      <LotStatusFilter />
      <TimeFilter />
    </Accordion>
  );
}
