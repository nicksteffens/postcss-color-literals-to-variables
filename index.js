const postcss = require("postcss");
const helpers = require("./helpers");
const indexedColors = [];

module.exports = postcss.plugin("postcss-color-literals-to-variables", function(
  opts
) {
  opts = opts || {};
  return function(root, result) {
    const colorList = [];
    root.walkRules(rule => {
      rule.walkDecls(decl => {
        if (
          helpers.isValidHex(decl.value) ||
          helpers.isValidColorFunction(decl.value)
        ) {
          translateToVariable(decl.value);
        }
      });
    });

    colorList.sort().reverse();

    colorList.forEach(color => {
      const prop = Object.keys(color)[0];
      const value = color[prop];
      root.prepend(postcss.decl({ prop, value }));
    });
  };
});
