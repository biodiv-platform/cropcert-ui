import { Box, Image } from "@chakra-ui/react";
import Container from "@components/@core/container";
import Activity from "@components/pages/observation/show/activity";
import { axAddPageComment } from "@services/pages.service";
import { RESOURCE_SIZE, RESOURCE_TYPE } from "@static/constants";
import { getResourceThumbnail, RESOURCE_CTX } from "@utils/media";
import React from "react";

import { UsePagesProvider } from "../common/sidebar/use-pages-sidebar";
import { Content } from "./content.server";
import { PageHeader } from "./header";

interface PageShowPageComponentProps {
  page;
  hideOgImage?;
  hideActivity?;
}

export default function PageShowPageComponent({
  page,
  hideOgImage,
  hideActivity,
}: PageShowPageComponentProps) {
  const ogImage = getResourceThumbnail(
    RESOURCE_CTX.PAGES,
    page.socialPreview || page.galleryData?.[0]?.fileName,
    RESOURCE_SIZE.TWITTER
  );

  return (
    <UsePagesProvider currentPage={page} linkType="show">
      <PageHeader page={page} ogImage={ogImage} />

      <Container maxW="48rem" py={6}>
        {!hideOgImage && page.socialPreview && ogImage && (
          <Box mb={6}>
            <Image h="150px" src={ogImage} alt={page.title} />
          </Box>
        )}
        <Content html={page.content} />

        {!hideActivity && (
          <Activity
            resourceId={page.id}
            resourceType={RESOURCE_TYPE.PAGE}
            commentFunc={axAddPageComment}
          />
        )}
      </Container>
    </UsePagesProvider>
  );
}
