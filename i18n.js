/* eslint-disable @typescript-eslint/no-var-requires */
const { LANG } = require("./src/configs/site-config");

module.exports = {
  defaultLocale: LANG.DEFAULT,
  locales: Object.keys(LANG.LIST),
  pages: {
    "*": ["common", "header", "auth", "form"],
    "/": ["page"],
    "rgx:/page/": ["page"],
  },
};
