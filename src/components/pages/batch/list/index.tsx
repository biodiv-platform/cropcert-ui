import { Box, SimpleGrid } from "@chakra-ui/react";
import TraceabilityTabs from "@components/pages/common/traceability-tabs";
import React from "react";

import BatchComponent from "./batch-list-component";
import Filters from "./filters";

export default function BatchListPageComponent() {
  return (
    <TraceabilityTabs>
      <Box w="full" h="100%" display="flex">
        <SimpleGrid w="full" columns={{ base: 1, lg: 14 }}>
          <Filters />
          <Box maxH="full" w="full" id="items-container" gridColumn={{ lg: "4/15" }} p={4}>
            <BatchComponent />
          </Box>
        </SimpleGrid>
      </Box>
    </TraceabilityTabs>
  );
}
