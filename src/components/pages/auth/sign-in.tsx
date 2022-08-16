import { Box, Flex } from "@chakra-ui/react";
import Container from "@components/@core/container";
import React from "react";

import SignInForm from "./form";

function SignInComponent() {
  return (
    <Container>
      <Flex align="center" justify="center">
        <Box maxW="sm" width="full" p={4}>
          <SignInForm />
        </Box>
      </Flex>
    </Container>
  );
}

export default SignInComponent;
