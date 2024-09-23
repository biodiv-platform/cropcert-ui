import { Accordion } from "@chakra-ui/react";
import React from "react";

import BatchNameFilter from "./batch-name";
import ReadyForLotFilter from "./ready-for-lot";
import TimeFilter from "./time";
import TypeFilter from "./type";

export default function FiltersList() {
  return (
    <Accordion allowMultiple={true}>
      <BatchNameFilter />
      <ReadyForLotFilter />
      <TypeFilter />
      <TimeFilter />
    </Accordion>
  );
}
