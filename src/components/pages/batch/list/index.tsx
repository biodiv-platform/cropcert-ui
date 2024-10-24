import { Box, SimpleGrid } from "@chakra-ui/react";
import React from "react";

import BatchComponent from "./batch-list-component";
import Filters from "./filters";

export default function BatchListPageComponent() {
  return (
    <Box w="full" maxH="calc( 100vh - var(--heading-height) )" display="flex">
      <SimpleGrid w="full" columns={{ base: 1, lg: 14 }}>
        <Filters />
        <Box maxH="full" w="full" id="items-container" gridColumn={{ lg: "4/15" }} p={4}>
          <BatchComponent />
        </Box>
      </SimpleGrid>
    </Box>
  );
}
