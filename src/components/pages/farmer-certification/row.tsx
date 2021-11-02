import { Box, Grid, Text } from "@chakra-ui/react";
import React from "react";

interface GridRowProps {
  field;
  label: string;
  name: string;
  previous?: any;
  mb?: number;
  bgGray?: boolean;
  [key: string]: any;
}

function GridRow({ field: Field, label, name, previous, mb, bgGray, ...props }: GridRowProps) {
  const previousProcessed = props.options?.length
    ? props.options?.find((o) => o.value === previous)?.label
    : typeof previous === "boolean"
    ? previous
      ? "Yes"
      : "No"
    : previous;

  return (
    <Grid
      className="grid-row"
      templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(8, 1fr)", `repeat(8, 1fr)`]}
      mb={mb || 4}
      data-odd={bgGray}
    >
      <Box gridColumn={{ base: "1/1", md: "1/5" }}>{label}</Box>

      {previousProcessed ? (
        <div>
          <Text as="small" display={{ md: "block" }} mr={2}>
            Previous
          </Text>
          {previousProcessed}
        </div>
      ) : (
        <div />
      )}

      <Box gridColumn={{ base: "1/1", md: "6/9" }}>
        <Field {...props} name={name} placeholder={label} mb={0} />
      </Box>
    </Grid>
  );
}

export default GridRow;
