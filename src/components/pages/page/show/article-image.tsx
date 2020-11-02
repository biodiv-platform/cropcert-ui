import { Heading, Text } from "@chakra-ui/core";
import styled from "@emotion/styled";
import { formattedDate, utc2local } from "@utils/basic.util";
import React from "react";
import { Page } from "types/pages";

const ArticleImageBox = styled.div`
  min-height: 360px;
  border-radius: 0.5rem;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  background-size: cover !important;
  background-position: center center !important;
  margin-bottom: 1rem;
  .main-title {
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
    padding: 1.6rem;
    width: 100%;
    color: white;
  }
`;

export default function ArticleImage({ page }: { page: Page }) {
  const bannerUrl = page?.bannerUrl || "/assets/article-fallback.jpeg";

  return (
    <ArticleImageBox style={{ background: `url(${bannerUrl}), var(--gray-300)` }}>
      <div className="main-title">
        <small>
          Published on {formattedDate(utc2local(page.createdOn).getTime())} by {page.authorName}
        </small>
        <Heading as="h1" mb={1}>
          {page.heading}
        </Heading>
        <Text fontStyle="italic" fontSize="lg">
          {page?.description}
        </Text>
      </div>
    </ArticleImageBox>
  );
}
