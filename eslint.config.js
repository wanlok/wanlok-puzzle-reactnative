// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require("eslint-config-expo/flat");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
  },
  {
    plugins: { "@typescript-eslint": typescriptEslint },
    rules: {
      "no-shadow": "off",
      "@typescript-eslint/no-shadow": "error",
    },
  },
]);
