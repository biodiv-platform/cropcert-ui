import { Accordion } from "@chakra-ui/react";
import React from "react";

import BatchIdFilter from "./Batch-id";
import BatchNameFilter from "./batch-name";
import BatchStatusFilter from "./batch-status";
import QuantityFilter from "./quantity";
import TimeFilter from "./time";
import TypeFilter from "./type";

export default function FiltersList() {
  return (
    <Accordion allowMultiple={true}>
      <BatchIdFilter />
      <BatchNameFilter />
      <QuantityFilter />
      <BatchStatusFilter />
      <TypeFilter />
      <TimeFilter />
    </Accordion>
  );
}
