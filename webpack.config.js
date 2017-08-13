const path = require('path');
const webpack = require('webpack');
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin');
const pkg = require('./package.json');

const config = {
  entry: ['whatwg-fetch', './src/index.js'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'honoka.min.js',
    library: 'honoka',
    libraryTarget: 'umd'
  },
  resolve: { extensions: ['.js'] },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  stats: 'detailed',
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.HONOKA_VERSION': JSON.stringify(pkg.version)
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true
      },
      beautify: false,
      comments: false
    }),
    new UnminifiedWebpackPlugin()
  ]
};

if (process.env.NODE_ENV === 'test') {
  config.module.rules.push({
    test: /\.(js|jsx)$/,
    enforce: 'post',
    exclude: /node_modules|test/,
    loader: 'istanbul-instrumenter-loader',
    options: {
      esModules: true
    }
  });
}

module.exports = config;
