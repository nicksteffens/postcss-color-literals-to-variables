const postcss = require("postcss");
const hexRex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

module.exports = postcss.plugin("postcss-color-literals-to-variables", function(
  opts
) {
  opts = opts || {};
  return function(root, result) {
    const colorList = [];
    root.walkRules(rule => {
      rule.walkDecls(decl => {
        if (decl.value.match(hexRex)) {
          const hexColor = decl.value;
          const colorKey = `$color-literal-${decl.value.slice(1)}`;
          const colorVar = {
            [colorKey]: hexColor
          };

          decl.value = colorKey;

          colorList.push(colorVar);
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
