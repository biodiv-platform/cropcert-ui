import { Box, Flex } from "@chakra-ui/react";
import Container from "@components/@core/container";
import React from "react";

import LoginForm from "./form";

function LoginComponent() {
  return (
    <Container>
      <Flex align="center" justify="center">
        <Box maxW="sm" width="full" p={4}>
          <LoginForm />
        </Box>
      </Flex>
    </Container>
  );
}

export default LoginComponent;
