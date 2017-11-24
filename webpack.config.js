const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const pkg = require('./package.json');

const config = {
  entry: {
    honoka: ['./src/index'],
    'honoka.min': ['./src/index'],
    'honoka-bundle': ['whatwg-fetch', './src/index'],
    'honoka-bundle.min': ['whatwg-fetch', './src/index']
  },
  output: {
    path: path.join(__dirname, 'lib'),
    filename: '[name].js',
    library: 'honoka',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: { extensions: ['.js'] },
  devtool: '#source-map',
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
      include: /\.min\.js$/,
      compress: {
        warnings: false,
        drop_console: true
      },
      beautify: false,
      comments: false
    }),
    new webpack.BannerPlugin({
      banner: `${pkg.name} v${
        pkg.version
      } | (c) ${new Date().getFullYear()} by ${pkg.author}`
    })
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new CleanWebpackPlugin(['lib']));
}

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
