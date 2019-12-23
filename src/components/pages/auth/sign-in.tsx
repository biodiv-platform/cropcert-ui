import { Box, Flex } from "@chakra-ui/core";
import { PageHeading } from "@components/@core/layout";
import React from "react";

import SignInForm from "./form";

function SignInComponent() {
  return (
    <Flex align="center" justify="center">
      <Box maxW="sm" width="full" p={4}>
        <PageHeading>Sign in to your account</PageHeading>
        <SignInForm />
      </Box>
    </Flex>
  );
}

export default SignInComponent;
