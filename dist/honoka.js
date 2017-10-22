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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ })
/******/ ]);
});
//# sourceMappingURL=honoka.js.map