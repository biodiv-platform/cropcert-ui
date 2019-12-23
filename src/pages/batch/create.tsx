import { Heading } from "@chakra-ui/core";
import { RestrictedAccess } from "@components/@core/layout";
import React from "react";

export default function BatchCreatePage() {
  return (
    <RestrictedAccess>
      <Heading>🎉 Migrated to Modal</Heading>
    </RestrictedAccess>
  );
}
