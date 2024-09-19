import { Box, SimpleGrid } from "@chakra-ui/react";
import React from "react";

import Filters from "./filters";
import LotListPageComponent from "./lot-list-component";

export default function FarmerMemberPageComponent() {
  return (
    <Box w="full" maxH="calc( 100vh - var(--heading-height) )" display="flex">
      <SimpleGrid w="full" columns={{ base: 1, lg: 14 }}>
        <Filters />
        <Box maxH="full" w="full" id="items-container" gridColumn={{ lg: "4/15" }} px={4}>
          <LotListPageComponent />
        </Box>
      </SimpleGrid>
    </Box>
  );
}
