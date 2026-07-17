import { defineConfig } from "eslint/config";
import reactPlugin from "eslint-plugin-react";
import jestPlugin from "eslint-plugin-jest";
import testingLibraryPlugin from "eslint-plugin-testing-library";
import babelParser from "@babel/eslint-parser";
import pluginSecurity from "eslint-plugin-security";
import securityNode from "eslint-plugin-security-node";
import eslintPluginNoUnsanitized from "eslint-plugin-no-unsanitized";
export default defineConfig([
  {
    ignores: [
      "node_modules/**",
      "build/**",
      "coverage/**",
      "reports/**",
    ],
  },

  {
    files: ["src/**/*.{js,jsx}"],

    languageOptions: {
      parser: babelParser,

      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-react"],
        },
        ecmaVersion: "latest",
        sourceType: "module",
      },

      globals: {
        console: "readonly",
        document: "readonly",
        fetch: "readonly",
        window: "readonly",
      },
    },

    plugins: {
  react: reactPlugin,
  security: pluginSecurity,
  "security-node": securityNode,
  "no-unsanitized": eslintPluginNoUnsanitized,
},

    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...eslintPluginNoUnsanitized.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "security/detect-eval-with-expression": "error",
      "security-node/detect-crlf": "error",
    },

    settings: {
      react: {
        version: "detect",
      },
    },
  },

  {
    files: [
      "src/**/*.test.{js,jsx}",
      "src/**/__tests__/**/*.{js,jsx}",
      "src/setupTests.js",
    ],

    plugins: {
      jest: jestPlugin,
      "testing-library": testingLibraryPlugin,
    },

    languageOptions: {
      globals: {
        test: "readonly",
        expect: "readonly",
        describe: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        it: "readonly",
        jest: "readonly",
      },
    },

    rules: {
      ...jestPlugin.configs.recommended.rules,
      ...testingLibraryPlugin.configs.react.rules,
      "testing-library/await-async-events": "off",
    },
  },
]);