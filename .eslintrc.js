module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "better-styled-components",
    "jest-dom",
    "testing-library",
  ],
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: 2018,
    sourceType: "module",
  },
  extends: ["airbnb", "airbnb/hooks"],
  rules: {
    "no-debugger":  "warn",
    "linebreak-style": ["error", (process.platform === "win32" ? "windows" : "unix")], // https://stackoverflow.com/q/39114446/2771889,
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
    "react/jsx-filename-extension": [2, { extensions: [".jsx", ".tsx"] }],
    "react/jsx-one-expression-per-line": [0],
    "react/jsx-props-no-spreading": [0],
    "react/jsx-uses-react": [0],
    "react/prop-types": [0],
    "react/react-in-jsx-scope": [0],
    "react/require-default-props": [0],
    semi: ["error", "never"],
    "better-styled-components/sort-declarations-alphabetically": 2,
    "jsx-a11y/aria-role": [
      2,
      {
        allowedInvalidRoles: ["text"],
        ignoreNonDOM: true,
      },
    ],
    "react/destructuring-assignment": ['off']
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
      extends: ["plugin:testing-library/react", "plugin:jest-dom/recommended"],
    },
  ],
};


