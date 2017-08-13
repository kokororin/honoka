'use strict';
var nodeFetch = require('node-fetch');

global.fetch = nodeFetch;
global.Response = nodeFetch.Response;
global.Headers = nodeFetch.Headers;
global.Request = nodeFetch.Request;

module.exports = require('./dist/honoka');
