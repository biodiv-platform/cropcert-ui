import { Box, Heading } from "@chakra-ui/core";
import CoreGrid from "@components/@core/layout/grid";
import { hasAccess } from "@utils/auth.util";
import { useStoreState } from "easy-peasy";
import React from "react";

import Card from "./card";
import links from "./links";

export default function DashboardPageComponent() {
  const user = useStoreState((state) => state.user);

  const getLinks = (children): [object] => {
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

  return <Box>{links.map(renderCardGroup)}</Box>;
}
