import { Heading, Text } from "@chakra-ui/react";
import React from "react";

import { ArticleImageBox } from "../page/show/article-image";

export default function MarketingHeader({ isGIAdmin }) {
  return (
    <ArticleImageBox
      style={{
        background: `url(/assets/marketing-bg.webp), var(--chakra-colors-gray-300)`,
        minHeight: "200px",
      }}
    >
      <div className="main-title">
        <Heading as="h1" mb={1}>
          {isGIAdmin ? "Lot Details" : "Lots for Sale"}
        </Heading>
        <Text fontStyle="italic" fontSize="lg">
          Organic certified coffee Rwenzori Mountain Coffee lots for sale are listed below. Please
          click on the Inquire button on the lot and send a mail with your mail and contact details
          and we will get back to you.
        </Text>
      </div>
    </ArticleImageBox>
  );
}
