/* eslint-disable @typescript-eslint/no-var-requires */
const { LANG } = require("./src/configs/site-config");

module.exports = {
  defaultLocale: LANG.DEFAULT,
  locales: Object.keys(LANG.LIST),
  pages: {
    "*": ["common", "header", "auth", "form"],
    "/": ["page"],
    "/marketing": ["page"],
    "rgx:/document/": ["document", "observation", "filters", "activity"],
    "rgx:/map": ["page", "map"],
    "rgx:/page/": ["page"],
    "rgx:/register": ["user"],
    "rgx:/user/": ["user", "group", "filters"],
  },
};