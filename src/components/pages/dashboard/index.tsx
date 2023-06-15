import { Box, Heading, Link, Stat, StatHelpText, StatNumber } from "@chakra-ui/react";
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
    return (
      cardGroup.title !== "Traceability" &&
      (linkList.length > 0 ? (
        <React.Fragment key={index}>
          <Heading mb={4} size="lg" style={{ fontSize: "1.8rem" }}>
            {cardGroup.title}
          </Heading>
          <CoreGrid mb={6}>{linkList}</CoreGrid>
        </React.Fragment>
      ) : null)
    );
  };

  return (
    <Container pt={6}>
      <Box>
        <Heading mb={4} size="lg" style={{ fontSize: "1.8rem" }}>
          {"Traceability"}
        </Heading>
        <CoreGrid mb={6}>
          <Box
            w="100%"
            rounded="lg"
            bg="gray.100"
            _hover={{
              bg: "blue.100",
            }}
            px={6}
            py={5}
          >
            <Link href={"/traceability/traceability-workflow"} style={{ textDecoration: "none" }}>
              <Stat>
                <StatNumber lineHeight="1em" mb={4} fontSize="2xl">
                  {"Traceability Workflow"}
                </StatNumber>
                <StatHelpText fontSize="md" mb={0}>
                  {"Traceability Workflow"} &rarr;
                </StatHelpText>
              </Stat>
            </Link>
          </Box>
        </CoreGrid>
      </Box>
      <Box maxWidth="60rem">{links.map(renderCardGroup)}</Box>
    </Container>
  );
}
