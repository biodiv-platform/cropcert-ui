import { Box, Heading, Text } from "@chakra-ui/react";
import Container from "@components/@core/container";
import React from "react";

interface PageHeadingProps {
  children;
  description?;
}

export const PageHeading = ({ children, description }: PageHeadingProps) => (
  <Box position="absolute" top={0} left={0} bottom={0} right={0}>
    <Container display="flex" boxSize="full" alignItems="center">
      <div>
        <Heading as="h1" size="2xl" mb={2} fontWeight="bolder">
          {children}
        </Heading>
        {description && (
          <Text fontSize="xl" maxLines={2}  fontWeight="semibold">
            {description}
          </Text>
        )}
      </div>
    </Container>
  </Box>
);
