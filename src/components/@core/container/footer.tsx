import { Box, Text } from "@chakra-ui/react";
import React from "react";

import packagejson from "../../../../package.json";
import Container from ".";

function Footer() {
  return (
    <Box borderTop="1px solid" borderColor="gray.200">
      <Container py={6}>
        <Text color="gray.700">Copyright &copy; 2022 (v{packagejson.version})</Text>
      </Container>
    </Box>
  );
}

export default Footer;
