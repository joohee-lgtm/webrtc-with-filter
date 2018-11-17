const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackCleanupPlugin = require("webpack-cleanup-plugin");
const path = require("path");
const fs = require('fs');

// const util = require('util');
// const glob = util.promisify(require('glob'));

const config = {
  entry: {
    app: ['./src/index.js'],
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
    })
  ]
};

async function getDemos() {
  return new Promise(function(resolve) {
    const demos = [];

    fs.readdirSync("./src/demos").forEach(file => {
      demos.push(file);
    })
    resolve(demos);
  });
}

async function injectConfig() {
  const targets = await getDemos();
  const entries = {};
  const plugins = [
    new HtmlWebPackPlugin({
      inject: false,
      scripts: [
        {
          src: '/app.js',
          type: 'module'
        }
      ],
      demos: targets,
      template: "./src/index.html",
      filename: "./index.html"
    })
  ];

  targets.forEach(function(dir){
    entries[`${dir}/index`] = [`./src/demos/${dir}/${dir}.js`]
    plugins.push(
      new HtmlWebPackPlugin({
        inject: false,
        template: `./src/demos/${dir}/${dir}.html`,
        filename: `./${dir}/index.html`
      })  
    );
  });

  config.entry = {
    ...config.entry,
    ...entries
  };
  config.plugins = config.plugins.concat(plugins);

  console.log(targets);
}

module.exports = () => {
  return new Promise(async (resolve, reject) => {
    await injectConfig();
    resolve(config);
  });
};
