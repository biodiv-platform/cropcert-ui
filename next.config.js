/* eslint-disable @typescript-eslint/no-var-requires */
const withNextTranslate = require("next-translate");
const packageJSON = require("./package.json");
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV !== "production",
  register: false,
  ignoreURLParametersMatching: [/^feFarmerId/, /^feCCCode/],
  additionalManifestEntries: [
    { url: "/", revision: packageJSON.version },
    { url: "/dashboard", revision: packageJSON.version },
    { url: "/farmer-certification/manage-farmers", revision: packageJSON.version },
    { url: "/farmer-certification/inspection-report/create", revision: packageJSON.version },
  ],
  runtimeCaching: [
    {
      urlPattern: "/",
      handler: "NetworkFirst",
      options: {
        cacheName: "start-url",
        expiration: {
          maxEntries: 4,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
        },
      },
    },
    {
      urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp|woff2|manifest)/i,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "v2-static-assets",
        expiration: {
          maxEntries: 1000,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 Days
        },
        cacheableResponse: {
          statuses: [0, 200, 304],
        },
      },
    },
    {
      urlPattern: /^https?.*/,
      handler: "NetworkFirst",
      options: {
        cacheName: "v2-light-cache",
        networkTimeoutSeconds: 15,
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 6 * 60 * 60, // 6 Hours
        },
        cacheableResponse: {
          statuses: [0, 200, 204, 404],
        },
      },
    },
  ],
});

module.exports = withNextTranslate(
  withPWA({
    experimental: {
      optimizePackageImports: ['@chakra-ui/react'],
      legacyBrowsers: false,
      browsersListForSwc: true,
    },
  })
);
