const base = require("./base");
const path = require("path");

module.exports = {
  ...base,
  mode: 'development',
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "./dist"),
    compress: true,
    port: 8080,
  },
};
