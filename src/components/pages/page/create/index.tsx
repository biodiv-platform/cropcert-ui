import { Box, SimpleGrid } from "@chakra-ui/react";
import Container from "@components/@core/container";
import React from "react";

import PagesSidebar from "../common/sidebar";
import { UsePagesProvider } from "../common/sidebar/use-pages-sidebar";
import PageCreateForm from "./form";

export default function PageCreatePageComponent() {
  return (
    <Container mt={6}>
      <UsePagesProvider linkType="show">
        <SimpleGrid columns={{ base: 1, md: 4 }} gap={{ base: 0, md: 4 }}>
          <PagesSidebar />
          <Box gridColumn={{ md: "2/5" }}>
            <PageCreateForm />
          </Box>
        </SimpleGrid>
      </UsePagesProvider>
    </Container>
  );
}
