import { Box, SimpleGrid } from "@chakra-ui/react";
import Container from "@components/@core/container";
import React from "react";

import PagesSidebar from "../common/sidebar";
import { UsePagesProvider } from "../common/sidebar/use-pages-sidebar";
import PageEditForm from "./form";

export default function PageEditPageComponent({ page }) {
  return (
    <Container mt={6} mb={6}>
      <UsePagesProvider currentPage={page} linkType="edit">
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={{ base: 0, md: 4 }}>
          <PagesSidebar />
          <Box gridColumn={{ md: "2/5" }}>
            <PageEditForm page={page} key={page.id} />
          </Box>
        </SimpleGrid>
      </UsePagesProvider>
    </Container>
  );
}
