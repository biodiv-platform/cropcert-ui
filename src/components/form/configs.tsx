export const reactSelectProps = {
  styles: {
    control: (p) => ({
      ...p,
      cursor: "text",
      paddingLeft: "0.4rem",
    }),
    valueContainer: (p) => ({ ...p, height: "38px" }),
    menu: (p) => ({ ...p, minWidth: "20em" }),
    menuPortal: (p) => ({ ...p, zIndex: 1900 }),
  },
  theme: (theme) => ({
    ...theme,
    colors: {
      ...theme.colors,
      neutral50: "var(--chakra-colors-gray-500)",
      neutral20: "var(--chakra-colors-gray-300)",
      primary25: "var(--chakra-colors-gray-100)",
      primary: "var(--chakra-colors-blue-500)",
    },
  }),
};

/**
 *
 * @deprecated using `reactSelectProps` instead
 * @type {*}
 * */
export const selectStyles = reactSelectProps.styles;
