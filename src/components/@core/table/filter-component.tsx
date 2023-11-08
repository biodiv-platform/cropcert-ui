import { Button, Flex, Input } from "@chakra-ui/react";
import React from "react";

export default function FilterComponent({ onFilter, onClear, filterText }) {
  return (
    <Flex mt={2}>
      <Input
        flex="1"
        type="text"
        placeholder="Filter by Farmer Name..."
        value={filterText}
        onChange={onFilter}
      />
      <Button ml={2} onClick={onClear}>
        Clear
      </Button>
    </Flex>
  );
}
