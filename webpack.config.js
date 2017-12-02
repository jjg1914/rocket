const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {  
  devtool: "source-map",
  entry: {
    index: [ "./src/index.ts", "./src/index.scss" ],
  },
  output: {
    path: __dirname + "/public",
    filename: "[name].js",
  },
  resolve: {
    extensions: [ '.js', '.ts', ".json", '.scss', '.tmx' ],
  },
  resolveLoader: {
    modules: [ "node_modules", "src/util" ],
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
      },
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
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader!autoprefixer-loader!sass-loader",
        }),
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      inject: "head",
    }),
    new ExtractTextPlugin({
      filename: "[name].css",
      disable: false,
      allChunks: true,
    }),
  ],
}
