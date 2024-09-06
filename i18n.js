/* eslint-disable @typescript-eslint/no-var-requires */
const { LANG } = require("./src/configs/site-config");

module.exports = {
  defaultLocale: LANG.DEFAULT,
  locales: Object.keys(LANG.LIST),
  pages: {
    "*": ["common", "header", "auth", "form", "traceability"],
    "/": ["page", "activity"],
    "/marketing": ["page"],
    "rgx:/document/": ["document", "observation", "filters", "activity"],
    "rgx:/map": ["page", "map"],
    "rgx:/page/": ["page", "activity"],
    "rgx:/register": ["user"],
    "rgx:/user/": ["user", "group", "filters"],
    "rgx:/media-gallery/": ["filters"],
    "rgx:/resource/": ["filters"],
    "rgx:/farmer/": ["filters"],
  },
};
