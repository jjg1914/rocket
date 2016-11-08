const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {  
  entry: {
    index: [ "./src/index.js", "./src/index.scss" ],
  },
  output: {
    path: __dirname + "/public",
    filename: "index.[name]",
  },
  resolve: {
    extensions: [ '', '.js', '.scss' ],
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: [ __dirname + "/src" ],
        query: {
          presets: [ 'es2015' ],
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader!sass-loader"),
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      inject: "head",
    }),
    new ExtractTextPlugin("[name].css", { allChunks: true }),
  ],
}
