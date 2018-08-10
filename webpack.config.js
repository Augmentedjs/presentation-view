const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  context: __dirname,
  target: "web",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'presentation-view.js',
    publicPath: '/dist/',
    library: "presentation-view",
    globalObject: 'this',
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  externals: {
    'augmentedjs-next': {
      commonjs: 'augmentedjs-next',
      commonjs2: 'augmentedjs-next',
      amd: 'augmentedjs-next',
      root: 'Augmented'
    },
    'lodash.bind': {
      commonjs: 'lodash.bind',
      commonjs2: 'lodash.bind',
      amd: 'lodash.bind',
      root: 'lodash.bind'
    }
  },
  stats: "errors-only",
  devtool: "source-map",
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(require("./package.json").version)
    })
  ]
};
