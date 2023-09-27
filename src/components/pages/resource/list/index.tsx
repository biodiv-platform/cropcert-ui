import { Box, SimpleGrid } from "@chakra-ui/react";
import React, { Suspense } from "react";

import Filters from "../filters";
import FilterFallback from "../filters/fallback";
import ListHeader from "../header";
import BulkMapperModal from "./bulk-mapper";
import Views from "./views";

export default function ResourceListPageComponent() {
  return (
    <Box w="full" maxH="calc( 100vh - var(--heading-height) )" display="flex">
      <SimpleGrid w="full" columns={{ base: 1, lg: 14 }}>
        <Suspense fallback={<FilterFallback />}>
          <Filters />
        </Suspense>
        <Box
          maxH="full"
          w="full"
          id="items-container"
          overflowY="auto"
          gridColumn={{ lg: "4/15" }}
          px={4}
        >
          <ListHeader />
          <Views />
        </Box>
      </SimpleGrid>
      <BulkMapperModal />
    </Box>
  );
}
