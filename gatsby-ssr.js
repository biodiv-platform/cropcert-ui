/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */
import "@styles/theme.scss";
import "@styles/index.scss";

export const wrapPageElement = ({ element }) => {
  return element;
};
