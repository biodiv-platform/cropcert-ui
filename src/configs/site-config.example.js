const SITE_CONFIG_EXAMPLE = {
  FOOTER: {
    SOCIAL: {
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
  GEOSERVER: {
    STORE: "naksha",
    WORKSPACE: "robust",
  },
  LANDSCAPE: {
    ACTIVE: false,
  },
  LANG: {
    DEFAULT: "en",
    DEFAULT_ID: 205,
    LIST: {
      en: { NAME: "English", I: "english", ID: 205 },
      fr: { NAME: "Français", I: "french", ID: 137 },
      sw: { NAME: "Kiswahili", I: "swahili", ID: 203 },
    },
    SWITCHER: false,
  },
  LICENSE: {
    DEFAULT: "822",
  },
  MAP: {
    ACTIVE: true,
    CENTER: {
      latitude: 3.46,
      longitude: 37.33,
      zoom: 0.2,
    },
    DEFAULT_LAYERS: true,
  },
  ODK: {
    URL: "https://odk.example.com/",
    DEFAULT_ODK_PASSWORD: "xxxx",
  },
  PAGES: {
    ACTIVE: true,
    PRIVACY: "/page/show/3",
    TERMS: "/page/show/2",
  },
  REGISTER: {
    MOBILE: false,
  },
  SITE: {
    API_ENDPOINT: "/",
    API_ENDPOINT_SSR: "http://localhost:8010/proxy/",
    ICON: "/logo.svg",
    TITLE_LOCAL: "ROBUST",
    URL: "http://localhost:3000",
  },
  TOKENS: {
    GMAP: "x",
    MAPBOX: "pk.x",
    OAUTH_GOOGLE: "x.apps.googleusercontent.com",
    RECAPTCHA: "x",
    SENTRY_DSN: false,
  },
  TRACKING: {
    ENABLED: false,
    GA_ID: "GA-X",
  },
};

module.exports = SITE_CONFIG_EXAMPLE;
