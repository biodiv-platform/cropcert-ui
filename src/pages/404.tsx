import { Box, Button, Heading, Text } from "@chakra-ui/react";
import Container from "@components/@core/container";
import React from "react";

export default function Page404() {
  return (
    <Container pt={10}>
      <Box textAlign="center" py={10} px={6}>
        <Heading display="inline-block" as="h2" size="2xl" bg="blue.500" backgroundClip="text">
          404
        </Heading>
        <Text fontSize="18px" mt={3} mb={2}>
          Page Not Found
        </Text>
        <Text color={"gray.500"} mb={6}>
          {"The page you're looking for does not seem to exist"}
        </Text>

        <Button colorScheme="blue" color="white" variant="solid" as="a" href="/">
          Go to Home
        </Button>
      </Box>
    </Container>
  );
}
