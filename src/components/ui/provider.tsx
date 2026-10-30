"use client";

import { ChakraProvider } from "@chakra-ui/react";
import React from "react";

import { customTheme } from "@/static/theme";

import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={customTheme}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
