import { Box, SimpleGrid } from "@chakra-ui/react";
import React from "react";

import FarmerMemberComponent from "./FarmerMemberComponent";
import Filters from "./filters";

export default function FarmerMemberPageComponent() {
  return (
    <Box w="full" h="100%" display="flex">
      <SimpleGrid w="full" columns={{ base: 1, lg: 14 }}>
        <Filters />
        <Box
          maxH="full"
          w="full"
          id="items-container"
          gridColumn={{ lg: "4/15" }}
          overflowY="auto"
          p={3}
        >
          <FarmerMemberComponent />
        </Box>
      </SimpleGrid>
    </Box>
  );
}
