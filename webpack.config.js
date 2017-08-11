const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');

module.exports = {
  entry: ['whatwg-fetch', './src/index.js'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'honoka.js',
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
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.HONOKA_VERSION': JSON.stringify(pkg.version)
    }),
    new webpack.optimize.AggressiveMergingPlugin()
  ]
};
