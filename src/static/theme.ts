import { createSystem, defaultConfig } from "@chakra-ui/react";

const defaultFontFamily =
  "-apple-system,BlinkMacSystemFont,Segoe UI,Inter,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji";

export const customTheme = createSystem(defaultConfig, {
  globalCss: {
    "html, body": {
      scrollBehavior: "smooth",
    },
  },
  theme: {
    tokens: {
      fonts: {
        heading: { value: defaultFontFamily },
        body: { value: defaultFontFamily },
      },
      fontWeights: {
        bold: { value: 600 },
      },
      colors: {
        blue: {
          50: { value: "#eff6ff" },
          100: { value: "#dbeafe" },
          200: { value: "#bfdbfe" },
          300: { value: "#93c5fd" },
          400: { value: "#60a5fa" },
          500: { value: "#3b82f6" },
          600: { value: "#2563eb" },
          700: { value: "#1d4ed8" },
          800: { value: "#1e40af" },
          900: { value: "#1e3a8a" },
        },
        gray: {
          50: { value: "#f8fafc" },
          100: { value: "#f1f5f9" },
          200: { value: "#e2e8f0" },
          300: { value: "#cbd5e1" },
          400: { value: "#94a3b8" },
          500: { value: "#64748b" },
          600: { value: "#475569" },
          700: { value: "#334155" },
          800: { value: "#1e293b" },
          900: { value: "#0f172a" },
        },
      },
    },
    semanticTokens: {
      colors: {
        "chakra-border-color": { value: "{colors.gray.300}" },
      },
    },
  },
});
