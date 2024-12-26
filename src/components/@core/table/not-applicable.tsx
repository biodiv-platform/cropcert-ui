import { Button } from "@chakra-ui/react";
import React from "react";

export default function NotApplicable() {
  return (
    <Button colorScheme="black" variant="outline" disabled={true} size="xs">
      NA
    </Button>
  );
}
