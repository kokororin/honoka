/* eslint no-var: 0 */
var nodeFetch = require('node-fetch');

global.fetch = nodeFetch;
global.Response = nodeFetch.Response;
global.Headers = nodeFetch.Headers;
global.Request = nodeFetch.Request;

module.exports = require('./dist/honoka');
