import { Box, SimpleGrid } from "@chakra-ui/react";
import TraceabilityTabs from "@components/pages/common/traceability-tabs";
import React from "react";

import FarmerProduceListComponent from "./farmer-produce-component";
import Filters from "./filters";

export default function FarmerProducePageComponent() {
  return (
    <TraceabilityTabs>
      <Box w="full" h="100%" display="flex">
        <SimpleGrid w="full" columns={{ base: 1, lg: 14 }}>
          <Filters />
          <Box
            maxH="full"
            w="full"
            id="items-container"
            gridColumn={{ lg: "4/15" }}
            p={4}
            overflowY="auto"
          >
            <FarmerProduceListComponent />
          </Box>
        </SimpleGrid>
      </Box>
    </TraceabilityTabs>
  );
}
