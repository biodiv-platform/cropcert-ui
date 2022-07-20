import { extendTheme } from "@chakra-ui/react";

const defaultFontFamily =
  "-apple-system,BlinkMacSystemFont,Segoe UI,Inter,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji";

export const customTheme: any = extendTheme({
  styles: {
    global: {
      "html, body": {
        background: "gray.50",
        scrollBehavior: "smooth",
      },
      body: {
        overflowY: "scroll",
      },
    },
  },
  fonts: {
    body: defaultFontFamily,
    heading: defaultFontFamily,
  },
  fontWeights: {
    bold: 600,
  },
  colors: {
    primary: {
      50: "#fbfbf8",
      100: "#f9f2e9",
      200: "#efd9cb",
      300: "#dab39e",
      400: "#c4876e",
      500: "#a86449",
      600: "#8b4932",
      700: "#693626",
      800: "#47251c",
      900: "#2b1711",
    },
    gray: {
      "50": "#f8f9fa",
      "100": "#f1f3f5",
      "200": "#e9ecef",
      "300": "#dee2e6",
      "400": "#ced4da",
      "500": "#adb5bd",
      "600": "#868e96",
      "700": "#495057",
      "800": "#343a40",
      "900": "#212529",
    },
  },
});
