var postcss = require("postcss");

var plugin = require("./");

function run(input, output, opts) {
  return postcss([plugin(opts)])
    .process(input)
    .then(function(result) {
      expect(result.css).toEqual(output);
      expect(result.warnings()).toHaveLength(0);
    });
}

it("creates hex variables and replaces it", function() {
  return run(
    ".hex { color: #000; background-color: #ffffff } .rgb { color: rgb(0, 0, 0);}",
    "$color-literal-000: #000; $color-literal-ffffff: #ffffff; .selector { color: $color-literal-000; background-color: $color-literal-ffffff}"
  );
});
