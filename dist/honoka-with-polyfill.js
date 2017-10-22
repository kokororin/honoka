/*! honoka v0.4.8 | (c) 2017 by kokororin */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["honoka"] = factory();
	else
		root["honoka"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__defaults__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__methods__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__interceptors__ = __webpack_require__(5);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }






function honoka(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  options = _extends({}, __WEBPACK_IMPORTED_MODULE_1__defaults__["a" /* default */], options);

  options.method = options.method.toLowerCase();

  if (typeof url !== 'string') {
    throw new TypeError('Argument 1 expected string but got ' + (typeof url === 'undefined' ? 'undefined' : _typeof(url)));
  }

  if (!Object(__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* isAbsoluteURL */])(url)) {
    url = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["i" /* trimEnd */])(options.baseURL, '/') + '/' + Object(__WEBPACK_IMPORTED_MODULE_0__utils__["j" /* trimStart */])(url, '/');
  }

  if (options.method === 'get' && Object(__WEBPACK_IMPORTED_MODULE_0__utils__["e" /* isObject */])(options.data)) {
    url = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* buildURL */])(url, options.data);
  }

  Object(__WEBPACK_IMPORTED_MODULE_0__utils__["g" /* normalizeHeaders */])(options.headers);

  // Set default headers for specified methods
  var methodDefaultHeaders = __WEBPACK_IMPORTED_MODULE_1__defaults__["a" /* default */].headers[options.method];
  if (Object(__WEBPACK_IMPORTED_MODULE_0__utils__["e" /* isObject */])(methodDefaultHeaders)) {
    options.headers = _extends({}, methodDefaultHeaders, options.headers);
  }

  Object(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* forEach */])(__WEBPACK_IMPORTED_MODULE_2__methods__["a" /* default */], function (method) {
    delete options.headers[method];
  });

  if (options.headers['Content-Type'] === 'application/json') {
    options.body = JSON.stringify(options.data);
  } else if (Object(__WEBPACK_IMPORTED_MODULE_0__utils__["f" /* isString */])(options.headers['Content-Type']) && options.headers['Content-Type'].indexOf('application/x-www-form-urlencoded') > -1) {
    var searchParams = new URLSearchParams(options.data);
    options.body = searchParams;
  } else if (options.data && options.method !== 'get' && options.method !== 'head') {
    options.body = options.data;
  }

  if (options.headers['Content-Type'] === 'multipart/form-data') {
    delete options.headers['Content-Type'];
  }

  // parse interceptors
  var reversedInterceptors = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* reduce */])(__WEBPACK_IMPORTED_MODULE_3__interceptors__["a" /* default */].get(), function (array, interceptor) {
    return [interceptor].concat(_toConsumableArray(array));
  }, []);

  Object(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* forEach */])(reversedInterceptors, function (interceptor) {
    if (interceptor.request) {
      var interceptedOptions = interceptor.request(options);
      if (Object(__WEBPACK_IMPORTED_MODULE_0__utils__["e" /* isObject */])(interceptedOptions)) {
        options = interceptedOptions;
      } else {
        throw new Error('Apply request interceptor failed, please check your interceptor');
      }
    }
  });

  return new Promise(function (resolve, reject) {
    if (options.timeout > 0) {
      setTimeout(function () {
        reject(new Error('Request timeout'));
      }, options.timeout);
    }

    fetch(url, options).then(function (response) {
      honoka.response = response;

      response.clone().text().then(function (responseData) {
        var ct = response.headers.get('Content-Type');
        if (ct && ct.match(/application\/json/i)) {
          responseData = JSON.parse(responseData);
        }

        Object(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* forEach */])(reversedInterceptors, function (interceptor) {
          if (interceptor.response) {
            var interceptedResponse = interceptor.response(responseData, response);
            if (Object(__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* isArray */])(interceptedResponse) && interceptedResponse.length === 2) {
              responseData = interceptedResponse[0];
              honoka.response = response = interceptedResponse[1];
            } else {
              reject(new Error('Apply response interceptor failed, please check your interceptor'));
            }
          }
        });

        if (response.status >= 200 && response.status < 400) {
          resolve(responseData);
        } else {
          reject(new Error('Not expected status code', response.status));
        }
      });
    }).catch(function (e) {
      reject(e);
    });
  });
}

honoka.defaults = __WEBPACK_IMPORTED_MODULE_1__defaults__["a" /* default */];
honoka.interceptors = __WEBPACK_IMPORTED_MODULE_3__interceptors__["a" /* default */];
// Let's export the library version
honoka.version = "0.4.8";

// Provide aliases for supported request methods
Object(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* forEach */])(__WEBPACK_IMPORTED_MODULE_2__methods__["a" /* default */], function (method) {
  honoka[method] = function (url, options) {
    return honoka(url, _extends({
      method: method
    }, options));
  };
});

/* harmony default export */ __webpack_exports__["default"] = (honoka);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["j"] = trimStart;
/* harmony export (immutable) */ __webpack_exports__["i"] = trimEnd;
/* harmony export (immutable) */ __webpack_exports__["e"] = isObject;
/* harmony export (immutable) */ __webpack_exports__["d"] = isArray;
/* harmony export (immutable) */ __webpack_exports__["f"] = isString;
/* harmony export (immutable) */ __webpack_exports__["b"] = forEach;
/* harmony export (immutable) */ __webpack_exports__["h"] = reduce;
/* harmony export (immutable) */ __webpack_exports__["c"] = isAbsoluteURL;
/* harmony export (immutable) */ __webpack_exports__["a"] = buildURL;
/* harmony export (immutable) */ __webpack_exports__["g"] = normalizeHeaders;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__methods__ = __webpack_require__(2);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };



var spaceChars = ' \\s\xA0';
var symbolRegex = /([[\]().?/*{}+$^:])/g;

function trimStart(str) {
  var charlist = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : spaceChars;

  charlist = (charlist + '').replace(symbolRegex, '$1');
  var re = new RegExp('^[' + charlist + ']+', 'g');
  return (str + '').replace(re, '');
}

function trimEnd(str) {
  var charlist = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : spaceChars;

  charlist = (charlist + '').replace(symbolRegex, '\\$1');
  var re = new RegExp('[' + charlist + ']+$', 'g');
  return (str + '').replace(re, '');
}

var toString = Object.prototype.toString;
var hasOwn = Object.prototype.hasOwnProperty;

function isObject(value) {
  return value !== null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object';
}

function isArray(value) {
  return toString.call(value) === '[object Array]';
}

function isString(value) {
  return typeof value === 'string';
}

function forEach(object, fn, context) {
  if (toString.call(fn) !== '[object Function]') {
    throw new TypeError('iterator must be a function');
  }

  var l = object.length;
  if (l === +l) {
    for (var i = 0; i < l; i++) {
      fn.call(context, object[i], i, object);
    }
  } else {
    for (var k in object) {
      if (Object.prototype.hasOwnProperty.call(object, k)) {
        fn.call(context, object[k], k, object);
      }
    }
  }
}

function reduce(array, fn, initialValue) {
  var hasAcc = arguments.length >= 3;
  if (hasAcc && array.reduce) {
    return array.reduce(fn, initialValue);
  }
  if (array.reduce) {
    return array.reduce(fn);
  }

  for (var i = 0; i < array.length; i++) {
    if (!hasOwn.call(array, i)) {
      continue;
    }
    if (!hasAcc) {
      initialValue = array[i];
      hasAcc = true;
      continue;
    }
    initialValue = fn(initialValue, array[i], i);
  }
  return initialValue;
}

function isAbsoluteURL(url) {
  return (/^(?:[a-z]+:)?\/\//i.test(url)
  );
}

function buildURL(url, params) {
  if (!params) {
    return url;
  }

  var uris = [];

  forEach(params, function (value, key) {
    if (isObject(value)) {
      value = JSON.stringify(value);
    }
    uris.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
  });

  url += (url.indexOf('?') === -1 ? '?' : '&') + uris.join('&');

  return url;
}

function normalizeHeaders(headers) {
  var ucFirst = function ucFirst(str) {
    str += '';
    return str.charAt(0).toUpperCase() + str.substr(1);
  };

  forEach(headers, function (value, key) {
    if (__WEBPACK_IMPORTED_MODULE_0__methods__["a" /* default */].indexOf(key) === -1) {
      var normalizedKey = ucFirst(key.toLowerCase().replace('_', '-').replace(/-(\w)/g, function ($0, $1) {
        return '-' + ucFirst($1);
      }));
      delete headers[key];
      headers[normalizedKey] = value;
    }
  });
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (['get', 'delete', 'head', 'options', 'post', 'put', 'patch']);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0).default;
module.exports.default = __webpack_require__(0).default;

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(1);


// honoka default options
var defaults = {
  timeout: 0,
  baseURL: '',
  method: 'get',
  headers: {}
};

// set the default content-type of request methods
Object(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* forEach */])(['delete', 'get', 'head'], function (method) {
  defaults.headers[method] = {};
});

Object(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* forEach */])(['post', 'put', 'patch'], function (method) {
  defaults.headers[method] = {
    'Content-Type': 'application/json'
  };
});

/* harmony default export */ __webpack_exports__["a"] = (defaults);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// honoka interceptors injections
var interceptorContainer = [];

/* harmony default export */ __webpack_exports__["a"] = ({
  register: function register(interceptor) {
    interceptorContainer.push(interceptor);
    return function () {
      var index = interceptorContainer.indexOf(interceptor);
      if (index >= 0) {
        interceptorContainer.splice(index, 1);
      }
    };
  },
  clear: function clear() {
    interceptorContainer.length = 0;
  },
  get: function get() {
    return interceptorContainer;
  }
});

/***/ }),
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(8);
__webpack_require__(9);
module.exports = __webpack_require__(3);


/***/ }),
/* 8 */
/***/ (function(module, exports) {

(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1])
      }, this)
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var oldValue = this.map[name]
    this.map[name] = oldValue ? oldValue+','+value : value
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    name = normalizeName(name)
    return this.has(name) ? this.map[name] : null
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value)
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this)
      }
    }
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = String(input)
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    rawHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = 'status' in options ? options.status : 200
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 *
 *
 * @author Jerry Bendy <jerry@icewingcc.com>
 * @licence MIT
 *
 */

(function(self) {
    'use strict';

    var nativeURLSearchParams = self.URLSearchParams ? self.URLSearchParams : null,
        isSupportObjectConstructor = nativeURLSearchParams && (new nativeURLSearchParams({a: 1})).toString() === 'a=1',
        __URLSearchParams__ = "__URLSearchParams__",
        prototype = URLSearchParamsPolyfill.prototype,
        iterable = !!(self.Symbol && self.Symbol.iterator);

    if (nativeURLSearchParams && isSupportObjectConstructor) {
        return;
    }


    /**
     * Make a URLSearchParams instance
     *
     * @param {object|string|URLSearchParams} search
     * @constructor
     */
    function URLSearchParamsPolyfill(search) {
        search = search || "";

        // support construct object with another URLSearchParams instance
        if (search instanceof URLSearchParams || search instanceof URLSearchParamsPolyfill) {
            search = search.toString();
        }

        this [__URLSearchParams__] = parseToDict(search);
    }


    /**
     * Appends a specified key/value pair as a new search parameter.
     *
     * @param {string} name
     * @param {string} value
     */
    prototype.append = function(name, value) {
        appendTo(this [__URLSearchParams__], name, value);
    };

    /**
     * Deletes the given search parameter, and its associated value,
     * from the list of all search parameters.
     *
     * @param {string} name
     */
    prototype.delete = function(name) {
        delete this [__URLSearchParams__] [name];
    };

    /**
     * Returns the first value associated to the given search parameter.
     *
     * @param {string} name
     * @returns {string|null}
     */
    prototype.get = function(name) {
        var dict = this [__URLSearchParams__];
        return name in dict ? dict[name][0] : null;
    };

    /**
     * Returns all the values association with a given search parameter.
     *
     * @param {string} name
     * @returns {Array}
     */
    prototype.getAll = function(name) {
        var dict = this [__URLSearchParams__];
        return name in dict ? dict [name].slice(0) : [];
    };

    /**
     * Returns a Boolean indicating if such a search parameter exists.
     *
     * @param {string} name
     * @returns {boolean}
     */
    prototype.has = function(name) {
        return name in this [__URLSearchParams__];
    };

    /**
     * Sets the value associated to a given search parameter to
     * the given value. If there were several values, delete the
     * others.
     *
     * @param {string} name
     * @param {string} value
     */
    prototype.set = function set(name, value) {
        this [__URLSearchParams__][name] = ['' + value];
    };

    /**
     * Returns a string containg a query string suitable for use in a URL.
     *
     * @returns {string}
     */
    prototype.toString = function() {
        var dict = this[__URLSearchParams__], query = [], i, key, name, value;
        for (key in dict) {
            name = encode(key);
            for (i = 0, value = dict[key]; i < value.length; i++) {
                query.push(name + '=' + encode(value[i]));
            }
        }
        return query.join('&');
    };


    /*
     * Apply polifill to global object and append other prototype into it
     */
    self.URLSearchParams = (nativeURLSearchParams && !isSupportObjectConstructor) ?
        new Proxy(nativeURLSearchParams, {
            construct: function(target, args) {
                return new target((new URLSearchParamsPolyfill(args[0]).toString()));
            }
        }) :
        URLSearchParamsPolyfill;


    var USPProto = self.URLSearchParams.prototype;

    USPProto.polyfill = true;

    /**
     *
     * @param {function} callback
     * @param {object} thisArg
     */
    USPProto.forEach = USPProto.forEach || function(callback, thisArg) {
        var dict = parseToDict(this.toString());
        Object.getOwnPropertyNames(dict).forEach(function(name) {
            dict[name].forEach(function(value) {
                callback.call(thisArg, value, name, this);
            }, this);
        }, this);
    };

    /**
     * Sort all name-value pairs
     */
    USPProto.sort = USPProto.sort || function() {
        var dict = parseToDict(this.toString()), keys = [], k, i, j;
        for (k in dict) {
            keys.push(k);
        }
        keys.sort();

        for (i = 0; i < keys.length; i++) {
            this.delete(keys[i]);
        }
        for (i = 0; i < keys.length; i++) {
            var key = keys[i], values = dict[key];
            for (j = 0; j < values.length; j++) {
                this.append(key, values[j]);
            }
        }
    };

    /**
     * Returns an iterator allowing to go through all keys of
     * the key/value pairs contained in this object.
     *
     * @returns {function}
     */
    USPProto.keys = USPProto.keys || function() {
        var items = [];
        this.forEach(function(item, name) {
            items.push([name]);
        });
        return makeIterator(items);
    };

    /**
     * Returns an iterator allowing to go through all values of
     * the key/value pairs contained in this object.
     *
     * @returns {function}
     */
    USPProto.values = USPProto.values || function() {
        var items = [];
        this.forEach(function(item) {
            items.push([item]);
        });
        return makeIterator(items);
    };

    /**
     * Returns an iterator allowing to go through all key/value
     * pairs contained in this object.
     *
     * @returns {function}
     */
    USPProto.entries = USPProto.entries || function() {
        var items = [];
        this.forEach(function(item, name) {
            items.push([name, item]);
        });
        return makeIterator(items);
    };


    if (iterable) {
        USPProto[self.Symbol.iterator] = USPProto[self.Symbol.iterator] || USPProto.entries;
    }


    function encode(str) {
        var replace = {
            '!': '%21',
            "'": '%27',
            '(': '%28',
            ')': '%29',
            '~': '%7E',
            '%20': '+',
            '%00': '\x00'
        };
        return encodeURIComponent(str).replace(/[!'\(\)~]|%20|%00/g, function(match) {
            return replace[match];
        });
    }

    function decode(str) {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    }

    function makeIterator(arr) {
        var iterator = {
            next: function() {
                var value = arr.shift();
                return {done: value === undefined, value: value};
            }
        };

        if (iterable) {
            iterator[self.Symbol.iterator] = function() {
                return iterator;
            };
        }

        return iterator;
    }

    function parseToDict(search) {
        var dict = {};

        if (typeof search === "object") {
            for (var i in search) {
                if (search.hasOwnProperty(i)) {
                    var str = typeof search [i] === 'string' ? search [i] : JSON.stringify(search [i]);
                    appendTo(dict, i, str);
                }
            }

        } else {
            // remove first '?'
            if (search.indexOf("?") === 0) {
                search = search.slice(1);
            }

            var pairs = search.split("&");
            for (var j = 0; j < pairs.length; j++) {
                var value = pairs [j],
                    index = value.indexOf('=');

                if (-1 < index) {
                    appendTo(dict, decode(value.slice(0, index)), decode(value.slice(index + 1)));

                } else {
                    if (value) {
                        appendTo(dict, decode(value), '');
                    }
                }
            }
        }

        return dict;
    }

    function appendTo(dict, name, value) {
        if (name in dict) {
            dict[name].push('' + value);
        } else {
            dict[name] = ['' + value];
        }
    }

})(typeof global !== 'undefined' ? global : (typeof window !== 'undefined' ? window : this));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)))

/***/ }),
/* 10 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })
/******/ ]);
});
//# sourceMappingURL=honoka-with-polyfill.js.map