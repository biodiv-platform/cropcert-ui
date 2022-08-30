import { GridItem, SimpleGrid } from "@chakra-ui/react";
import Container from "@components/@core/container";
import { RESOURCE_SIZE } from "@static/constants";
import { getResourceThumbnail, RESOURCE_CTX } from "@utils/media";
import React, { useMemo } from "react";

import PagesSidebar from "../common/sidebar";
import { UsePagesProvider } from "../common/sidebar/use-pages-sidebar";
import { Content } from "./content.server";
import { PageHeader } from "./header";

interface PageShowPageComponentProps {
  page;
}

export default function PageShowPageComponent(props: PageShowPageComponentProps) {
  const page = useMemo(
    () => ({
      ...props.page,
      galleryData: props.page.galleryData.map((image) => ({
        ...image,
        url: getResourceThumbnail(RESOURCE_CTX.PAGES, image.fileName, RESOURCE_SIZE.TWITTER),
        pageUrl: getResourceThumbnail(RESOURCE_CTX.PAGES, image.fileName, RESOURCE_SIZE.PAGE),
      })),
    }),
    [props.page.id]
  );

  return (
    <UsePagesProvider currentPage={page} linkType="show">
      <PageHeader page={page} />

      <Container py={6}>
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
