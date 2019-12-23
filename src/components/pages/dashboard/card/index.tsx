import { Box, Link, Stat, StatHelpText, StatNumber } from "@chakra-ui/core";
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
      <StatNumber lineHeight="1em" mb={2} fontSize="xl">
        {title}
      </StatNumber>
      <StatHelpText mb={0}>{description} &rarr;</StatHelpText>
    </Stat>
  );

  return (
    <NextLink href={to} passHref={true}>
      <Link style={{ textDecoration: "none" }}>
        <Box w="100%" bg="white" border="1px solid var(--gray-400)" rounded="md" px={5} py={2}>
          {getContent()}
        </Box>
      </Link>
    </NextLink>
  );
}

export default Card;
