const withSass = require("@zeit/next-sass");
const nextEnv = require("next-env");
const dotenvLoad = require("dotenv-load");

dotenvLoad();

const withNextEnv = nextEnv({
  staticPrefix: "NEXT_",
});

module.exports = withNextEnv(withSass());
