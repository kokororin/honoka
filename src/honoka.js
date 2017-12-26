import forEach from 'foreach';
import reduce from 'array-reduce';
import qsEncode from 'querystring/encode';
import {
  trimStart,
  trimEnd,
  isAbsoluteURL,
  buildURL,
  normalizeHeaders,
  isObject,
  isArray,
  isString,
  isFormData,
  isNode
} from './utils';
import defaults from './defaults';
import methods from './methods';
import interceptors from './interceptors';

if (!isNode()) {
  require('whatwg-fetch');
}

function honoka(url, options = {}) {
  options = {
    ...defaults,
    ...options
  };

  options.method = options.method.toLowerCase();

  if (typeof url !== 'string') {
    throw new TypeError(`Argument 1 expected string but got ${typeof url}`);
  }

  if (!isAbsoluteURL(url)) {
    url = `${trimEnd(options.baseURL, '/')}/${trimStart(url, '/')}`;
  }

  if (options.method === 'get' && isObject(options.data)) {
    url = buildURL(url, options.data);
  }

  normalizeHeaders(options.headers);

  // Set default headers for specified methods
  const methodDefaultHeaders = defaults.headers[options.method];
  if (isObject(methodDefaultHeaders)) {
    options.headers = {
      ...methodDefaultHeaders,
      ...options.headers
    };
  }

  forEach(methods, method => delete options.headers[method]);

  const isContentTypeString = isString(options.headers['Content-Type']);

  if (
    isContentTypeString &&
    options.headers['Content-Type'].match(/application\/json/i)
  ) {
    options.body = JSON.stringify(options.data);
  } else if (
    isContentTypeString &&
    options.headers['Content-Type'].match(/application\/x-www-form-urlencoded/i)
  ) {
    options.body = qsEncode(options.data);
  } else if (
    options.data &&
    (options.method !== 'get' && options.method !== 'head')
  ) {
    options.body = options.data;
  }

  if (
    isFormData(options.data) ||
    (isContentTypeString &&
      options.headers['Content-Type'].match(/multipart\/form-data/i))
  ) {
    delete options.headers['Content-Type'];
  }

  // parse interceptors
  const reversedInterceptors = reduce(
    interceptors.get(),
    (array, interceptor) => [interceptor, ...array],
    []
  );

  forEach(reversedInterceptors, interceptor => {
    if (interceptor.request) {
      const interceptedOptions = interceptor.request(options);
      if (isObject(interceptedOptions)) {
        options = interceptedOptions;
      } else {
        throw new Error(
          'Apply request interceptor failed, please check your interceptor'
        );
      }
    }
  });

  return new Promise((resolve, reject) => {
    if (options.timeout > 0) {
      setTimeout(() => {
        reject(new Error('Request timeout'));
      }, options.timeout);
    }

    fetch(url, options)
      .then(response => {
        honoka.response = response.clone();

        switch (options.dataType.toLowerCase()) {
          case 'arraybuffer':
            return honoka.response.arrayBuffer();
          case 'blob':
            return honoka.response.blob();
          case 'json':
            return honoka.response.json();
          case 'buffer':
            if (!isNode()) {
              reject(new Error('"buffer" is not supported in browser'));
            }
            return honoka.response.buffer();
          case 'text':
          default:
            return honoka.response.text();
          case '':
          case 'auto':
            return honoka.response.text();
        }
      })
      .then(responseData => {
        if (options.dataType === '' || options.dataType === 'auto') {
          const contentType = honoka.response.headers.get('Content-Type');
          if (contentType && contentType.match(/application\/json/i)) {
            responseData = JSON.parse(responseData);
          }
        }

        forEach(reversedInterceptors, interceptor => {
          if (interceptor.response) {
            const interceptedResponse = interceptor.response(
              responseData,
              honoka.response
            );
            if (
              isArray(interceptedResponse) &&
              interceptedResponse.length === 2
            ) {
              responseData = interceptedResponse[0];
              honoka.response = interceptedResponse[1];
            } else {
              reject(
                new Error(
                  'Apply response interceptor failed, please check your interceptor'
                )
              );
            }
          }
        });

        if (honoka.response.status >= 200 && honoka.response.status < 400) {
          resolve(responseData);
        } else {
          reject(new Error('Not expected status code'));
        }
      })
      .catch(reject);
  });
}

honoka.defaults = defaults;
honoka.interceptors = interceptors;
// Let's export the library version
honoka.version = process.env.HONOKA_VERSION;

// Provide aliases for supported request methods
forEach(methods, method => {
  honoka[method] = (url, options) => {
    return honoka(url, {
      method,
      ...options
    });
  };
});

export default honoka;
