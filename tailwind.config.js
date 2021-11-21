module.exports = {
  mode: "jit",
  purge: ["./components/**/*.tsx", "./pages/**/*.tsx", "./lib/textTreeNode.ts"],
  darkMode: false,
  theme: {
    fontFamily: {
      header: [
        "Roboto\\ Slab",
        "ui-serif",
        "Georgia",
        "Cambria",
        "Times\\ New\\ Roman",
        "Times",
        "serif",
      ],
      body: [
        "Source\\ Serif\\ Pro",
        "ui-serif",
        "Georgia",
        "Cambria",
        "Times\\ New\\ Roman",
        "Times",
        "serif",
      ],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
