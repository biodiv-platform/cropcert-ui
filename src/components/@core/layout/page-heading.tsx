import { Box, Flex, Heading } from "@chakra-ui/react";
import { motion, useScroll, useTransform } from "framer-motion";
import React from "react";

interface PageHeadingProps {
  children;
  mb?: number;
  actions?;
  [x: string]: any;
}

export default function PageHeading({
  children,
  mb = 2,
  actions,
  PreviousPageButton,
  floatHeader = false,
  ...props
}: PageHeadingProps) {
  const { scrollY } = useScroll();

  // Adjust the threshold for when the header becomes sticky
  const stickyThreshold = 50; // You can adjust this value based on your layout
  const opacity = useTransform(scrollY, [0, stickyThreshold], [1, 0.8]);
  const scale = useTransform(scrollY, [0, stickyThreshold], [1, 0.95]);
  return (
    <Flex
      alignItems={"center"}
      as={motion.header}
      position={floatHeader ? "sticky" : "relative"}
      top="0"
      backgroundColor={"white"}
      zIndex={floatHeader ? 99 : 0}
      rounded={floatHeader ? "md" : undefined}
      shadow={floatHeader ? "sm" : undefined}
      my={floatHeader ? 2 : 0}
      px={floatHeader ? 2 : 0}
      pt={floatHeader ? 2 : 0}
    >
      <Box mb={mb} mt={6}>
        {PreviousPageButton && PreviousPageButton}
      </Box>
      <Flex
        flex={1}
        justifyContent={{ base: "center", md: "space-between" }}
        alignItems="center"
        mb={mb ?? 0}
        flexWrap={"wrap"}
        gap={2}
      >
        {floatHeader ? (
          <motion.div style={{ opacity, scale }} transition={{ duration: 0.3 }}>
            <Heading as="h1" display="inline-block" {...props}>
              {children}
            </Heading>
          </motion.div>
        ) : (
          <Heading as="h1" display="inline-block" {...props}>
            {children}
          </Heading>
        )}
        {actions && actions}
      </Flex>
    </Flex>
  );
}
