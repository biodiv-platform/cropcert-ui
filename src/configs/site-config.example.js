const SITE_CONFIG_EXAMPLE = {
  SITE: {
    API_ENDPOINT: "/",
    API_ENDPOINT_SSR: "http://localhost:8010/proxy/",
    ICON: "/logo.png",
    TITLE_LOCAL: "ROBUST",
    URL: "http://localhost:3000",
  },
  ODK: {
    URL: "https://odk.site.tld/",
  },
  LANG: {
    DEFAULT: "en",
    DEFAULT_ID: 205,
    SWITCHER: false,
    LIST: {
      en: { NAME: "English", I: "english", ID: 205 },
      fr: { NAME: "Français", I: "french", ID: 137 },
      sw: { NAME: "Kiswahili", I: "swahili", ID: 203 },
    },
  },
  TRACKING: {
    ENABLED: false,
    GA_ID: "GA-X",
  },
  FOOTER: {
    SOCIAL: {
      FACEBOOK: {
        ICON: "ibpfacebook",
        LABEL: "common:footer.facebook",
        URL: "https://www.facebook.com/x",
      },
      GITHUB: {
        ICON: "ibpgithub",
        LABEL: "common:footer.github",
        URL: "https://github.com/biodiv-platform?q=cropcert",
      },
      MAIL: {
        ICON: "ibpmail",
        LABEL: "common:footer.email",
        URL: "mailto:contact@site.tld",
      },
      TWITTER: {
        HANDLE: "@x",
        ICON: "ibptwitter",
        LABEL: "common:footer.twitter",
        URL: "https://twitter.com/x",
      },
    },
  },
  LANDSCAPE: {
    ACTIVE: false,
  },
};

module.exports = SITE_CONFIG_EXAMPLE;
