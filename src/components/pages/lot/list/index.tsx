import { Box, SimpleGrid } from "@chakra-ui/react";
import React from "react";

import Filters from "./filters";
import LotComponent from "./lot-list-component";

export default function LotListPageComponent() {
  return (
    <Box w="full" h="100%" display="flex">
      <SimpleGrid w="full" columns={{ base: 1, lg: 14 }}>
        <Filters />
        <Box maxH="full" w="full" id="items-container" gridColumn={{ lg: "4/15" }} p={4}>
          <LotComponent />
        </Box>
      </SimpleGrid>
    </Box>
  );
}
