/* eslint prefer-arrow-callback: 0 */
/* eslint object-shorthand: 0 */
const path = require('path');
const webpackCfg = require('./webpack.config.test');
const server = require('./test/server');

if (process.env.CI) {
  process.env.CHROME_BIN = require('puppeteer').executablePath();
}

module.exports = function (config) {
  const configuration = {
    basePath: '',
    browsers: process.env.CI ? ['KarmaChromeHeadless'] : ['Chrome'],
    customLaunchers: {
      KarmaChromeHeadless: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },
    files: ['test/loadtests.js'],
    port: 3003,
    captureTimeout: 60000,
    frameworks: ['mocha', 'chai', 'express-http-server'],
    client: {
      mocha: {}
    },
    singleRun: true,
    reporters: ['mocha', 'coverage-istanbul'],
    preprocessors: {
      'test/loadtests.js': ['webpack', 'sourcemap']
    },
    webpack: webpackCfg,
    webpackServer: {
      noInfo: true
    },
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true,
      dir: path.join(__dirname, 'coverage'),
      'report-config': {
        html: {
          // outputs the report in ./coverage/html
          subdir: 'html'
        }
      }
    },
    expressHttpServer: {
      port: server.port,
      // this function takes express app object and allows you to modify it
      // to your liking. For more see http://expressjs.com/4x/api.html
      appVisitor: server
    }
  };

  config.set(configuration);
};
