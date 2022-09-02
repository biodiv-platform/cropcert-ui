import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";

export default function Container(props: BoxProps) {
  return <Box width="full" maxWidth="72rem" mx="auto" px={4} {...props} />;
}
