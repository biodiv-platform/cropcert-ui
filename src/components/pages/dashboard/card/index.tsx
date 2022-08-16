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
    <Stat my={2}>
      <StatNumber lineHeight="1em" mb={3} fontSize="2xl">
        {title}
      </StatNumber>
      <StatHelpText mb={0}>{description} &rarr;</StatHelpText>
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
        // bg="white"
        border="0px solid var(--chakra-colors-gray-300)"
        rounded="md"
        bg="gray.100"
        _hover={{
          bg: "blue.100",
          borderColor: "gray.500",
        }}
        px={5}
        py={2}
      >
        {getContent()}
      </Box>
    </XLink>
  );
}

export default Card;
