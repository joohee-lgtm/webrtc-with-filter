const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackCleanupPlugin = require("webpack-cleanup-plugin");
const path = require("path");
const util = require('util');
const glob = util.promisify(require('glob'));


const config = {
  entry: {
    app: ['./src/index.js'],
    "faceFilter/index": ['./src/demos/faceFilter/faceFilter.js'],
    "gif/index": ['./src/demos/gif/gif.js'],
    "text/index": ['./src/demos/text/text.js'],
    "caman/index": ['./src/demos/caman/caman.js'],
    "glsl/index": ['./src/demos/glsl/glsl.js']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: './dist'
  },
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, './dist'),
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(json|png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: '../'
            }
          },
          "css-loader"
        ]
      }
    ]
  },
  plugins: [
    new WebpackCleanupPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebPackPlugin({
      inject: false,
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new HtmlWebPackPlugin({
      inject: false,
      template: "./src/demos/faceFilter/faceFilter.html",
      filename: "./faceFilter/index.html"
    }),
    new HtmlWebPackPlugin({
      inject: false,
      template: "./src/demos/gif/gif.html",
      filename: "./gif/index.html"
    }),
    new HtmlWebPackPlugin({
      inject: false,
      template: "./src/demos/text/text.html",
      filename: "./text/index.html"
    }),
    new HtmlWebPackPlugin({
      inject: false,
      template: "./src/demos/caman/caman.html",
      filename: "./caman/index.html"
    }),
    new HtmlWebPackPlugin({
      inject: false,
      template: "./src/demos/glsl/glsl.html",
      filename: "./glsl/index.html"
    }),
  ]
};

module.exports = config;