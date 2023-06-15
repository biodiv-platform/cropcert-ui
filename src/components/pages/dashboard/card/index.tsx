import { Box, Link, Stat, StatHelpText, StatNumber } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

interface IProps {
  title: string;
  description: string;
  to: string;
  external: boolean;
}

function Card({ title, description, to, external = false }: IProps) {
  const getContent = () => (
    <Stat>
      <StatNumber lineHeight="1em" mb={4} fontSize="2xl">
        {title}
      </StatNumber>
      <StatHelpText fontSize="md" mb={0}>
        {description} &rarr;
      </StatHelpText>
    </Stat>
  );

  const XLink = ({ children }) =>
    external ? (
      <Link href={to} style={{ textDecoration: "none" }}>
        {children}
      </Link>
    ) : (
      <NextLink href={to} passHref={true}>
        <Link style={{ textDecoration: "none" }}>{children}</Link>
      </NextLink>
    );

  return (
    <XLink>
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
        {getContent()}
        <Stat>
          <StatNumber lineHeight="1em" mb={4} fontSize="2xl">
            {title}
          </StatNumber>
          <StatHelpText fontSize="md" mb={0}>
            {description} &rarr;
          </StatHelpText>
        </Stat>
      </Box>
    </XLink>
  );
}

export default Card;
