import { extendTheme } from "@chakra-ui/react";

const defaultFontFamily =
  "-apple-system,BlinkMacSystemFont,Segoe UI,Inter,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji";

export const customTheme: any = extendTheme({
  fonts: {
    body: defaultFontFamily,
    heading: defaultFontFamily,
  },
  fontWeights: {
    bold: 600,
  },
  colors: {
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
