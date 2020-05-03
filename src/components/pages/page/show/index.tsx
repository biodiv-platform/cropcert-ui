import { Box, Heading, Text } from "@chakra-ui/core";
import { formattedDate, utc2local } from "@utils/basic.util";
import React from "react";
import { Page } from "types/pages";

interface IHomePageProps {
  page: Page;
}

function HomePageComponent({ page }: IHomePageProps) {
  return (
    <Box>
      <Box textAlign="center" py={8}>
        <Heading as="h1" pb={3}>
          {page.heading}
        </Heading>
        <Text fontSize="lg" color="gray.600">
          Published on {formattedDate(utc2local(page.createdOn).getTime())} by {page.authorName}
        </Text>
      </Box>
      <div className="article" dangerouslySetInnerHTML={{ __html: page.content }} />
    </Box>
  );
}

export default HomePageComponent;
