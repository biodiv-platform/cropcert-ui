import { Grid } from "@chakra-ui/core";
import React from "react";

interface CustomRowProps {
  children;
  mb?: number;
  bgGray?: boolean;
}

function CustomRow({ children, mb = 2, bgGray = false }: CustomRowProps) {
  return (
    <Grid
      className="grid-row fade"
      templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(2, 1fr)", `repeat(2, 1fr)`]}
      mb={mb}
      p={4}
      data-odd={bgGray}
    >
      {children}
    </Grid>
  );
}

export default CustomRow;
