const withSass = require("@zeit/next-sass");
const nextEnv = require("next-env");
const dotenvLoad = require("dotenv-load");
const path = require("path");

dotenvLoad();

const withNextEnv = nextEnv({
  staticPrefix: "NEXT_"
});

module.exports = withNextEnv(
  withSass({
    webpack: config => {
      config.resolve.alias["@components"] = path.join(__dirname, `src/components`);
      config.resolve.alias["@hooks"] = path.join(__dirname, `src/hooks`);
      config.resolve.alias["@pages"] = path.join(__dirname, `src/pages`);
      config.resolve.alias["@services"] = path.join(__dirname, `src/services`);
      config.resolve.alias["@static"] = path.join(__dirname, `src/static`);
      config.resolve.alias["@stores"] = path.join(__dirname, `src/stores`);
      config.resolve.alias["@styles"] = path.join(__dirname, `src/styles`);
      config.resolve.alias["@utils"] = path.join(__dirname, `src/utils`);
      return config;
    }
  })
);
