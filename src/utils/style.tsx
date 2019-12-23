import flat from "flat";

/**
 * Creates root css variables to unused colors are excluded
 *
 * @param {*} { colors }
 * @returns {String}
 */
export const jsontocss = ({ colors: { gray, white, black, blue } }): String => {
  const flatColors = flat({ gray, white, black, blue }, { delimiter: "-" });
  let css = ":root{";
  for (let [key, value] of Object.entries(flatColors)) {
    css = css.concat(`--${key.toLowerCase()}: ${value};`);
  }
  css = css.concat("}");
  return css;
};
