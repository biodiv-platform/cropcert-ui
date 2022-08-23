import { GridItem, SimpleGrid } from "@chakra-ui/react";
import Container from "@components/@core/container";
import React from "react";

import PagesSidebar from "../common/sidebar";
import { UsePagesProvider } from "../common/sidebar/use-pages-sidebar";
import { Content } from "./content.server";
import { PageHeader } from "./header";

interface PageShowPageComponentProps {
  page;
}

export default function PageShowPageComponent({ page }: PageShowPageComponentProps) {
  return (
    <UsePagesProvider currentPage={page} linkType="show">
      <PageHeader page={page} />

      <Container mb={6} pt={6}>
        <SimpleGrid columns={{ md: 7 }} spacing={{ base: 0, md: 8 }}>
          <GridItem colSpan={{ md: 5 }}>
            <Content html={page.content} />
          </GridItem>
          <GridItem colSpan={{ md: 2 }} pt={6}>
            <PagesSidebar />
          </GridItem>
        </SimpleGrid>
      </Container>
    </UsePagesProvider>
  );
}
