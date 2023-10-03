import {
  Box,
  Flex,
  Link,
  Stat,
  StatHelpText,
  StatNumber,
  Tag,
  useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

import OdkModal from "./odk-modal";

interface IProps {
  title: string;
  description: string;
  to: string;
  external: boolean;
  tag?: string;
}

function Card({ title, description, to, tag, external = false }: IProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getContent = () => (
    <Stat>
      <Flex alignItems="center" mb={4}>
        <StatNumber lineHeight="1em" fontSize="2xl">
          {title}
        </StatNumber>
        {tag && (
          <Tag colorScheme="red" color="red.500" ml={2}>
            {tag}
          </Tag>
        )}
      </Flex>
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
          <OdkModal isOpen={isOpen} odkLink={to} onClose={onClose} />
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
