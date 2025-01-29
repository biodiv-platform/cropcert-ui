import { Box, Flex, Link, useDisclosure } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

import { StatHelpText, StatRoot, StatValueText } from "@/components/ui/stat";
import { Tag } from "@/components/ui/tag";

import OdkModal from "./odk-modal";

interface IProps {
  title: string;
  description: string;
  to: string;
  external: boolean;
  tag?: string;
}

function Card({ title, description, to, tag, external = false }: IProps) {
  const { open, onOpen, onClose } = useDisclosure();

  const getContent = () => (
    <StatRoot>
      <Flex alignItems="center" mb={4}>
        <StatValueText lineHeight="1em" fontSize="2xl">
          {title}
        </StatValueText>
        {tag && (
          <Tag colorPalette="red" color="red.500" ml={2}>
            {tag}
          </Tag>
        )}
      </Flex>
      <StatHelpText fontSize="md" mb={0}>
        {description} &rarr;
      </StatHelpText>
    </StatRoot>
  );

  const XLink = ({ children }) =>
    external ? (
      <Link href={to} style={{ textDecoration: "none" }}>
        {children}
      </Link>
    ) : (
      <NextLink href={to} passHref={true} legacyBehavior>
        <Link style={{ textDecoration: "none" }}>{children}</Link>
      </NextLink>
    );

  return (
    <>
      {title.includes("ROBUST ODK") ? (
        <>
          <Box
            w="100%"
            rounded="lg"
            bg="gray.100"
            _hover={{
              bg: "blue.100",
            }}
            onClick={onOpen}
            px={6}
            py={5}
          >
            {getContent()}
          </Box>
          <OdkModal open={open} odkLink={to} onClose={onClose} />
        </>
      ) : (
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
          </Box>
        </XLink>
      )}
    </>
  );
}

export default Card;
