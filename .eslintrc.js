module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["error"],
    "react-hooks/rules-of-hooks": "error", // Verifica reglas de los hooks
    "react-hooks/exhaustive-deps": "warn",
    "no-unused-vars": [
      "warn",
      { vars: "all", args: "none", ignoreRestSiblings: true },
    ],
  },
};
