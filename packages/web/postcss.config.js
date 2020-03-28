const purgecss = require("@fullhuman/postcss-purgecss")({
  content: [
    "./src/**/*.html",
    "./src/**/*.js",
    "./src/**/*.js",
    "./src/**/*.bs.js"
  ],

  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
});

module.exports = {
  plugins: [
    require("postcss-import"),
    require("tailwindcss"),
    require("autoprefixer"),
    ...(process.env.NODE_ENV === "production" ? [purgecss] : [])
  ]
};
