const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackCleanupPlugin = require("webpack-cleanup-plugin");
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
    inline: true,
    port: 3000
  },
  cache: false,
  watch: true,
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
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};

async function getDemos() {
  return new Promise(function(resolve) {
    const demos = [];
    const root = "./src/demos";

    fs.readdirSync(root, {withFileTypes: true}).forEach((file) => {
      const stat = fs.statSync(`${root}/${file}`);
      stat.isDirectory() && demos.push(file);
    })
    console.log(demos);
    resolve(demos);
    return demos;
  });
}

async function injectConfig() {
  const targets = await getDemos();
  const entries = {};
  const plugins = [
    new HtmlWebPackPlugin({
      cache: false,
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
    entries[`${dir}/index`] = [`./src/demos/${dir}/index.js`]
    plugins.push(
      new HtmlWebPackPlugin({
        cache: false,
        inject: false,
        template: `./src/demos/${dir}/index.html`,
        filename: `./${dir}/index.html`
      })  
    );
  });

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
    return ;
  });
}
