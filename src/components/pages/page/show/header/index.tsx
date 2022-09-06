import { Box } from "@chakra-ui/react";
import SITE_CONFIG from "@configs/site-config";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import { PageHeading } from "./page-heading";
import { PageOptions } from "./page-options";
import { PageSlider } from "./page-slider";

interface PageHeaderProps {
  page;
  ogImage?;
  hideOptions?;
}

export const PageHeader = ({ page, hideOptions, ogImage }: PageHeaderProps) => {
  const router = useRouter();
  const { lang } = useTranslation();

  return (
    <>
      <NextSeo
        openGraph={{
          type: "website",
          locale: lang,
          url: SITE_CONFIG.SITE.URL + router.asPath,
          title: page.title,
          images: ogImage ? [{ url: ogImage }] : undefined,
          description: page.description,
        }}
        title={page.title}
      />
      <Box
        bg="gray.800"
        bgImage="url('/assets/page-cover.svg')"
        backgroundRepeat="repeat"
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
};
