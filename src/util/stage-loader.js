const xml2js = require("xml2js");

module.exports = function StageLoader(source) {
  const cb = this.async();
  const version = this.version;

  xml2js.parseString(source, function (err, result) {
    if (err) {
      cb(err);
    } else {
      var value = JSON.stringify(result);
      var module = version && version >= 2 ?
        `export default ${value};` : `module.exports = ${value};`;
      cb(null, module);
    }
  });
}
