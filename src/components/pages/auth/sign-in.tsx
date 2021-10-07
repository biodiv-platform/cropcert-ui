import { Box, Flex } from "@chakra-ui/react";
import React from "react";

import SignInForm from "./form";

function SignInComponent() {
  return (
    <Flex align="center" justify="center">
      <Box maxW="sm" width="full" p={4}>
        <SignInForm />
      </Box>
    </Flex>
  );
}

export default SignInComponent;
