import { Box, Heading } from "@chakra-ui/react";
import Container from "@components/@core/container";
import CoreGrid from "@components/@core/layout/grid";
import useGlobalState from "@hooks/use-global-state";
import { hasAccess } from "@utils/auth";
import React from "react";

import Card from "./card";
import links from "./links";

export default function DashboardPageComponent() {
  const { user } = useGlobalState();

  const getLinks = (children): Record<string, unknown>[] => {
    return children.reduce(
      (acc, link, index) =>
        hasAccess(link.access, user) ? [...acc, <Card key={index} {...link} />] : acc,
      []
    );
  };

  const renderCardGroup = (cardGroup, index) => {
    const linkList = getLinks(cardGroup.children);
    return linkList.length > 0 ? (
      <React.Fragment key={index}>
        <Heading mb={4} size="lg" style={{ fontSize: "1.8rem" }}>
          {cardGroup.title}
        </Heading>
        <CoreGrid mb={6}>{linkList}</CoreGrid>
      </React.Fragment>
    ) : null;
  };

  return (
    <Container>
      <Box pt={4} w="full" h="100%" display="flex" flexDirection={"column"}>
        {links.map(renderCardGroup)}
      </Box>
    </Container>
  );
}
