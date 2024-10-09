import { Accordion } from "@chakra-ui/react";
import React from "react";

import LotNameFilter from "./lot-name";
import TimeFilter from "./time";

export default function FiltersList() {
  return (
    <Accordion allowMultiple={true}>
      <LotNameFilter />
      <TimeFilter />
    </Accordion>
  );
}
