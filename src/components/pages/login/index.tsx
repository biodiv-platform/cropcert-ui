import { Box, Flex } from "@chakra-ui/react";
import Container from "@components/@core/container";
import { useRouter } from "next/router";
import React from "react";

import LoginForm from "./form";

function LoginComponent() {
  const router = useRouter();

  return (
    <Container>
      <Flex align="center" justify="center">
        <Box maxW="sm" width="full" p={4}>
          <LoginForm forward={router.query?.forward} />
        </Box>
      </Flex>
    </Container>
  );
}

export default LoginComponent;
