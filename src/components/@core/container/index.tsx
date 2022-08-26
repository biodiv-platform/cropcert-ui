import { Box, BoxProps } from "@chakra-ui/react";
import React from "react";

export default function Container(props: BoxProps) {
  return <Box width="full" maxWidth="1280px" mx="auto" px={4} {...props} />;
}
