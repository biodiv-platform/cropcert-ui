import { Grid } from "@chakra-ui/core";
import React from "react";

interface ResponsiveRowProps {
  children;
  mb?: number;
  bgGray?: boolean;
  rows?: number;
  minH?;
}

function ResponsiveRow({ children, mb = 2, bgGray = false, rows = 2, minH }: ResponsiveRowProps) {
  return (
    <Grid
      className="grid-row fade"
      templateColumns={{ base: "repeat(1, 1fr)", md: `repeat(${rows}, 1fr)` }}
      mb={mb}
      p={4}
      data-odd={bgGray}
      minH={minH}
    >
      {children}
    </Grid>
  );
}

export default ResponsiveRow;
