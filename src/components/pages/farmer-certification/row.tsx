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
      className="grid-row"
      templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(7, 1fr)", `repeat(7, 1fr)`]}
      mb={mb}
      data-odd={bgGray}
    >
      <Box gridColumn={{ base: "1/1", md: "1/5" }}>{label}</Box>

      {previous ? (
        <div>
          <Text as="small" display={{ md: "block" }} mr={2}>
            Previous
          </Text>
          {previous}
        </div>
      ) : (
        <div />
      )}

      <Box gridColumn={{ base: "1/1", md: "6/8" }}>
        {React.cloneElement(children, { placeholder: label, mb: 0 })}
      </Box>
    </Grid>
  );
}

export default GridRow;
