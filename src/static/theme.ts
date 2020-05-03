import { theme } from "@chakra-ui/core";

const customTheme: any = {
  ...theme,
  fontWeights: {
    ...theme.fontWeights,
    bold: 600,
  },
  colors: {
    ...theme.colors,
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
};

export default customTheme;
