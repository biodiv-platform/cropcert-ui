import { SimpleGrid } from "@chakra-ui/react";
import React from "react";

function CoreGrid({ children, rows = 3, mb = 0, ...props }) {
  return (
    <SimpleGrid columns={{ base: 1, md: 3, lg: rows }} gap={4} mb={mb} {...props}>
      {children}
    </SimpleGrid>
  );
}

export default CoreGrid;
