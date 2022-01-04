import { Box, Text } from "@chakra-ui/react";
import React from "react";

import packagejson from "../../../../package.json";

function Footer() {
  return (
    <Box bg="gray.200" py={6} textAlign="center" flexShrink={0}>
      <Text color="gray.700">Copyright &copy; 2022 (v{packagejson.version})</Text>
    </Box>
  );
}

export default Footer;
