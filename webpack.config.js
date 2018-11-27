const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackCleanupPlugin = require("webpack-cleanup-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require("path");
const fs = require('fs');

// https://github.com/FEDevelopers/tech.description/wiki/Webpack%EC%9D%98-%ED%98%BC%EB%9E%80%EC%8A%A4%EB%9F%B0-%EC%82%AC%ED%95%AD%EB%93%A4
const config = {
  entry: {
    app: ["./src/index.js"],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: './dist'
  },
  // https://github.com/webpack/webpack/issues/2530
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    historyApiFallback: true,
    watchContentBase: true,
    disableHostCheck: true,
    inline: true,
    port: 3000
  },
  cache: false,
  watch: true,
  module: {
    rules: [{
        test: /\.(json|png|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          }
        }]
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
        use: [{
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
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};

async function getDemos() {
  return new Promise(function (resolve) {
    const demos = [];
    const root = "./src/demos";

    fs.readdirSync(root, {
      withFileTypes: true
    }).forEach((file) => {
      const stat = fs.statSync(`${root}/${file}`);
      stat.isDirectory() && demos.push(file);
    })
    resolve(demos);
    return demos;
  });
}

function makeDemoDir(target) {
  /*
  [ 'basic-mode',
  'colorfilter-css',
  'colorfilter-gifxjs',
  'colorfilter-glsl',
  'colorfilter-svg',
  'facetracking-clmtrackr',
  'facetracking-jeeliz',
  'facetracking-trackingjs',
  'ouput-ffmpegserver',
  'ouput-gif',
  'output-mediarecord',
  'touchevent-fabric' ]
  */
  var arr = {};
  target.forEach(function (str) {
    var root = str.split("-")[0];
    var sub = str.split("-")[1];

    if (!arr[root]) {
      arr[root] = [];
    }

    arr[root].push(sub);
  });

  var key = Object.keys(arr);
  var temp = [];

  key.forEach(function (item) {
    temp.push([item, arr[item]])
  });

  console.log(JSON.stringify(temp));

  return temp;
}

async function injectConfig() {
  const targets = await getDemos();
  const demoValues = makeDemoDir(targets);
  const entries = {};
  const plugins = [
    new HtmlWebPackPlugin({
      cache: false,
      inject: false,
      scripts: [{
        src: '/app.js',
        type: 'module'
      }],
      demos: demoValues,
      template: "./src/index.html",
      filename: "./index.html"
    })
  ];

  const copyWebpack = [];

  targets.forEach(function (dir) {
    entries[`${dir}/index`] = [`./src/demos/${dir}/index.js`]
    copyWebpack.push({
      from: `./src/demos/${dir}/lib/**.js`,
      to: `${dir}/lib/[name].js`,
    });
    plugins.push(
      new HtmlWebPackPlugin({
        cache: false,
        inject: false,
        template: `./src/demos/${dir}/index.html`,
        filename: `./${dir}/index.html`
      })
    );
  });

  plugins.push(
    new CopyWebpackPlugin(copyWebpack)
  )

  config.entry = {
    ...config.entry,
    ...entries
  };
  config.plugins = config.plugins.concat(plugins);
  return config;
}

module.exports = (env, argv) => {
  return new Promise(async (resolve, reject) => {
    const injected = await injectConfig();

    if (argv.mode === 'production') {
      injected.watch = false;
    }

    resolve(injected);
    return;
  });
}