module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "testing-library"],
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: 2018,
    sourceType: "module",
  },
  extends: ["airbnb"],
  rules: {
    "no-alert": 0,
    "no-debugger": "warn",
    "linebreak-style": [
      "error",
      process.platform === "win32" ? "windows" : "unix",
    ], // https://stackoverflow.com/q/39114446/2771889,
    "@typescript-eslint/array-type": ["error", { default: "array" }],
    "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
    "@typescript-eslint/no-shadow": ["error"],
    "@typescript-eslint/no-unused-vars": ["error"],
    "@typescript-eslint/no-use-before-define": ["error"],
    "func-names": "off",
    "import/extensions": [0],
    "import/prefer-default-export": [0],
    "jsx-quotes": ["error", "prefer-single"],
    "no-shadow": "off",
    "no-unused-vars": "off",
    "no-use-before-define": "off",
    semi: ["error", "never"],
    "jsx-a11y/aria-role": [
      2,
      {
        allowedInvalidRoles: ["text"],
        ignoreNonDOM: true,
      },
    ],
    "react/destructuring-assignment": ["off"],
  },
  env: { browser: true, jest: true },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  overrides: [
    {
      files: ["**/?(*.)+(spec|test).[jt]s?(x)"],
    },
  ],
};


