import { Box, SimpleGrid } from "@chakra-ui/react";
import { generateToC, wrapResponsiveTable } from "@utils/pages.util";
import React, { useEffect } from "react";
import { Page } from "types/pages";

import ArticleImage from "./article-image";

interface IHomePageProps {
  page: Page;
  preContent?;
}

function HomePageComponent({ page, preContent }: IHomePageProps) {
  useEffect(() => {
    generateToC(".article", ".toc");
  }, [page.id]);

  return (
    <Box>
      <ArticleImage page={page} />
      {preContent}
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4} maxW="full">
        <div>
          <div className="toc-container">
            <div className="toc"></div>
          </div>
        </div>
        <Box gridColumn={{ md: "2/5" }} borderRadius="md">
          <div
            className="article"
            dangerouslySetInnerHTML={{ __html: wrapResponsiveTable(page.content) }}
          />
        </Box>
      </SimpleGrid>
    </Box>
  );
}

export default HomePageComponent;
