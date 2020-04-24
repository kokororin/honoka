const path = require('path');
const webpack = require('webpack');
const pkg = require('./package.json');
const server = require('./test/server');

module.exports = {
  mode: 'development',
  entry: {
    honoka: './src/honoka'
  },
  resolve: { extensions: ['.js'] },
  devtool: '#source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.join(__dirname, 'src'), /node_modules\/merge-options/]
      },
      {
        test: /\.(js|jsx)$/,
        enforce: 'post',
        exclude: /node_modules|test|src\/interceptors\.js/,
        loader: 'istanbul-instrumenter-loader',
        options: {
          esModules: true
        }
      }
    ]
  },
  stats: 'detailed',
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.HONOKA_VERSION': JSON.stringify(pkg.version),
      'process.env.EXPRESS_BASE_URL': JSON.stringify(
        'http://localhost:' + server.port
      )
    })
  ]
};
