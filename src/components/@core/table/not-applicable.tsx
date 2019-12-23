import React from "react";
import { Button } from "@chakra-ui/core";

export default function NotApplicable() {
  return (
    <Button variantColor="black" variant="outline" isDisabled={true} size="xs">
      NA
    </Button>
  );
}
