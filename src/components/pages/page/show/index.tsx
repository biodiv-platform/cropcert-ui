import { Box, Image } from "@chakra-ui/react";
import Container from "@components/@core/container";
import { RESOURCE_SIZE } from "@static/constants";
import { getResourceThumbnail, RESOURCE_CTX } from "@utils/media";
import React from "react";

import { UsePagesProvider } from "../common/sidebar/use-pages-sidebar";
import { Content } from "./content.server";
import { PageHeader } from "./header";

interface PageShowPageComponentProps {
  page;
}

export default function PageShowPageComponent({ page }: PageShowPageComponentProps) {
  const ogImage = getResourceThumbnail(
    RESOURCE_CTX.PAGES,
    page.socialPreview || page.galleryData?.[0]?.fileName,
    RESOURCE_SIZE.TWITTER
  );

  return (
    <UsePagesProvider currentPage={page} linkType="show">
      <PageHeader page={page} ogImage={ogImage} />

      <Container maxW="48rem" py={6}>
        <Box mb={6}>
          <Image h="150px" src={ogImage} alt={page.title} />
        </Box>
        <Content html={page.content} />
      </Container>
    </UsePagesProvider>
  );
}
