import React from "react";
import { Button } from "@chakra-ui/react";

export default function NotApplicable() {
  return (
    <Button colorScheme="black" variant="outline" isDisabled={true} size="xs">
      NA
    </Button>
  );
}
