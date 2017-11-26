require('babel-polyfill');

// Add support for all files in the test directory
const testsContext = require.context('.', true, /(Test\.js$)|(!mocha\.js)/);
testsContext.keys().forEach(testsContext);
