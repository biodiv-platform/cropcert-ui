import { Box, Grid, Text } from "@chakra-ui/core";
import React from "react";

interface GridRowProps {
  children;
  label: string;
  previous?: any;
  mb?: number;
  bgGray?: boolean;
}

function GridRow({ children, label, previous, mb = 2, bgGray = false }: GridRowProps) {
  return (
    <Grid
      templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(7, 1fr)", `repeat(7, 1fr)`]}
      alignItems="center"
      gap={2}
      mb={mb}
      border="1px dashed"
      borderRadius="md"
      borderColor="gray.400"
      p={2}
      minH="4rem"
      bg={bgGray ? "gray.100" : "white"}
    >
      <Box gridColumn={["1/1", "1/1", "1/5", "1/5"]}>{label}</Box>

      {previous ? (
        <div>
          <Text as="small" display={[null, null, "block", "block"]} mr={2}>
            Previous
          </Text>
          {previous}
        </div>
      ) : (
        <div />
      )}

      <Box gridColumn={["1/1", "1/1", "6/8", "6/8"]}>
        {React.cloneElement(children, { placeholder: label, mb: 0 })}
      </Box>
    </Grid>
  );
}

export default GridRow;
