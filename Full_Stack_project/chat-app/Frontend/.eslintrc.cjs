module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "react/jsx-no-target-blank": "off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react/prop-types": "off",
    "sort-imports": [
      "error",
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      },
    ],
    "import/order": [
      1,
      {
        groups: [
          "external",
          "builtin",
          "internal",
          "sibling",
          "parent",
          "index",
        ],
      },
    ],
    groups: ["external", "builtin", "internal", "sibling", "parent", "index"],
    pathGroups: [
      {
        pattern: "components",
        group: "internal",
      },
      {
        pattern: "common",
        group: "internal",
      },
      {
        pattern: "routes/ **",
        group: "internal",
      },
      {
        pattern: "assets/**",
        group: "internal",
        position: "after",
      },
    ],
    pathGroupsExcludedImportTypes: ["internal"],
    alphabetize: {
      order: "asc",
      caseInsensitive: true,
    },
  },
};
