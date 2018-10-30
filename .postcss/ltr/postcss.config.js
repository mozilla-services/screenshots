const postcssLogical = require('postcss-logical');

module.exports = {
  plugins: [
    postcssLogical({"dir": "ltr"})
  ]
}
