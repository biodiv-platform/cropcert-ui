import { Box } from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import React from "react";

import { PageHeading } from "./page-heading";
import { PageOptions } from "./page-options";
import { PageSlider } from "./page-slider";

interface PageHeaderProps {
  page;
  hideOptions?;
}

export const PageHeader = ({ page, hideOptions }: PageHeaderProps) => (
  <>
    <NextSeo
      openGraph={{
        title: page.title,
        images: page.galleryData,
        description: page.description,
      }}
      title={page.title}
    />
    <Box
      bg="gray.800"
      bgImage="url('/assets/page-cover.svg')"
      backgroundSize="cover"
      backgroundPosition="bottom"
      color="white"
      h="300px"
      position="relative"
    >
      {page.galleryData?.length ? (
        <PageSlider images={page.galleryData} description={page.description} />
      ) : null}
      <PageHeading description={page.description}>{page.title}</PageHeading>
    </Box>
    {!hideOptions && <PageOptions title={page.title} pageId={page.id} />}
  </>
);
