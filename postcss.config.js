// eslint-disable-next-line unicorn/prefer-module
module.exports = {
  plugins: {
    // https://tailwindcss.com/docs/using-with-preprocessors#nesting
    'tailwindcss/nesting': 'postcss-nesting',
    tailwindcss: {},
    autoprefixer: {},
    'postcss-preset-env': {
      features: { 'nesting-rules': false },
    },
  },
};
