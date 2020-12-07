import flat from "flat";

/**
 * Creates root css variables to unused colors are excluded
 *
 * @param {*} { colors }
 * @returns {string}
 */
export const jsontocss = ({ colors: { gray, white, black, blue, red } }): string => {
  const flatColors: Record<string, string> = flat(
    { gray, white, black, blue, red },
    { delimiter: "-" }
  );
  let css = ":root{";
  for (const [key, value] of Object.entries(flatColors)) {
    css = css.concat(`--${key.toLowerCase()}: ${value};`);
  }
  css = css.concat("}");
  return css;
};
