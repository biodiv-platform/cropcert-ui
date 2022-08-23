import { extendTheme } from "@chakra-ui/react";
import { withProse } from "@nikolovlazar/chakra-ui-prose";

const defaultFontFamily =
  "-apple-system,BlinkMacSystemFont,Segoe UI,Inter,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji";

export const customTheme: any = extendTheme(
  {
    styles: {
      global: {
        "html, body": {
          scrollBehavior: "smooth",
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
      blue: {
        "50": "#eff6ff",
        "100": "#dbeafe",
        "200": "#bfdbfe",
        "300": "#93c5fd",
        "400": "#60a5fa",
        "500": "#3b82f6",
        "600": "#2563eb",
        "700": "#1d4ed8",
        "800": "#1e40af",
        "900": "#1e3a8a",
      },
      gray: {
        "50": "#f8fafc",
        "100": "#f1f5f9",
        "200": "#e2e8f0",
        "300": "#cbd5e1",
        "400": "#94a3b8",
        "500": "#64748b",
        "600": "#475569",
        "700": "#334155",
        "800": "#1e293b",
        "900": "#0f172a",
      },
    },
    semanticTokens: {
      colors: {
        "chakra-border-color": { _light: "gray.300" },
      },
    },
  },
  withProse({
    baseStyle: {
      "h2, h3, h4, h5": {
        marginTop: 0
      },
      a: {
        color: "blue.500",
      },
      table: {
        td: {
          border: "1px solid",
          borderColor: "gray.300",
          p: 2,
          verticalAlign: "inherit",
        },
        th: {
          border: "1px solid",
          borderColor: "gray.300",
          p: 2,
          verticalAlign: "inherit",
        },
        tr: {
          border: 0,
        },
      },
    },
  })
);
