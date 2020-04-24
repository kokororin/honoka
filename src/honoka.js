import forEach from 'foreach';
import reduce from 'array-reduce';
import merge from 'merge-options';
import qsEncode from 'querystring/encode';
import {
  trimStart,
  trimEnd,
  isAbsoluteURL,
  buildURL,
  normalizeHeaders,
  isObject,
  isString,
  isFormData,
  isNode
} from './utils';
import defaults from './defaults';
import methods from './methods';
import interceptors from './interceptors';

require('whatwg-fetch');

function honoka(url, options = {}) {
  options = merge(defaults, options);

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
    options.headers = merge(methodDefaultHeaders, options.headers);
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
    options.method !== 'get' &&
    options.method !== 'head'
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
        const clonedResponse = response.clone();
        let data;

        switch (options.dataType.toLowerCase()) {
          case 'arraybuffer':
            data = clonedResponse.arrayBuffer();
            break;
          case 'blob':
            data = clonedResponse.blob();
            break;
          case 'json':
            data = clonedResponse.json();
            break;
          case 'buffer':
            if (!isNode()) {
              reject(new Error('"buffer" is not supported in browser'));
            }
            data = clonedResponse.buffer();
            break;
          case 'text':
          default:
            data = clonedResponse.text();
            break;
          case '':
          case 'auto':
            data = clonedResponse.text();
            break;
        }
        response.data = data;
        return response;
      })
      .then(response => {
        response.data.then(data => {
          response.data = data;
          if (
            options.dataType.toLowerCase() === '' ||
            options.dataType.toLowerCase() === 'auto'
          ) {
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.match(/application\/json/i)) {
              response.data = JSON.parse(response.data);
            }
          }

          for (let i = 0; i < reversedInterceptors.length; i++) {
            const interceptor = reversedInterceptors[i];
            if (interceptor.response) {
              const interceptedResponse = interceptor.response(response);
              if (interceptedResponse instanceof Error) {
                reject(interceptedResponse);
                break;
              } else if (interceptedResponse) {
                response = interceptedResponse;
              } else {
                reject(
                  new Error(
                    'Apply response interceptor failed, please check your interceptor'
                  )
                );
              }
            }
          }
          if (options.expectedStatus(response.status)) {
            resolve(response);
          } else {
            reject(new Error(`Unexpected status code: ${response.status}`));
          }
        });
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
  honoka[method] = (url, options = {}) => {
    options.method = method;
    return honoka(url, options);
  };
});

export default honoka;
