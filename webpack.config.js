const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const pkg = require('./package.json');
const server = require('./test/server');

const config = {
  entry: {
    honoka: ['./src/index'],
    'honoka.min': ['./src/index']
  },
  output: {
    path: path.join(__dirname, 'lib'),
    filename: '[name].js',
    library: pkg.name,
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
        include: [path.join(__dirname, 'src'), /node_modules\/merge-options/]
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
      banner: `${pkg.name} v${pkg.version}
(c) ${new Date().getFullYear()} ${pkg.author}
Released under the ${pkg.license} License.
${pkg.homepage}`
    })
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new CleanWebpackPlugin(['lib']));
  config.plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: path.join(__dirname, 'report.html'),
      openAnalyzer: false,
      generateStatsFile: false
    })
  );
}

if (process.env.NODE_ENV === 'test') {
  config.module.rules.push({
    test: /\.(js|jsx)$/,
    enforce: 'post',
    exclude: /node_modules|test|src\/interceptors\.js/,
    loader: 'istanbul-instrumenter-loader',
    options: {
      esModules: true
    }
  });
}

module.exports = config;
