import { Heading, Text } from "@chakra-ui/react";
import React from "react";

import { ArticleImageBox } from "../page/show/article-image";

export default function MarketingHeader() {
  return (
    <ArticleImageBox
      style={{
        background: `url(/assets/marketing-bg.webp), var(--chakra-colors-gray-300)`,
        minHeight: "200px",
      }}
    >
      <div className="main-title">
        <Heading as="h1" mb={1}>
          Lots for Sale
        </Heading>
        <Text fontStyle="italic" fontSize="lg">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </Text>
      </div>
    </ArticleImageBox>
  );
}
