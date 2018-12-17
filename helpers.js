// This was inspired from [sass-lint helpers](https://github.com/sasstools/sass-lint/blob/develop/lib/helpers.js)
const helpers = {};
const colorFunctions = ["rgb", "rgba", "hsl", "hsla"];

helpers.isValidHex = function(str) {
  if (str.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
    return true;
  }
  return false;
};

helpers.isValidColorFunction = function(str) {
  if (str.indexOf(colorFunctions)) {
    return true;
  }
  return false;
};

module.exports = helpers;
