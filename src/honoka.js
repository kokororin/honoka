import {
  trimStart,
  trimEnd,
  isAbsoluteURL,
  buildURL,
  isObject,
  forEach,
  reduce
} from './utils';

if (!global.Promise) {
  throw new Error(
    'Cannot find Promise in your environment. You may need a promise-polyfill.'
  );
}

function honoka(url, options = {}) {
  options = {
    ...honoka.defaults,
    ...options
  };

  if (!isAbsoluteURL(url)) {
    url = trimEnd(options.baseURL, '/') + '/' + trimStart(url, '/');
  }

  if (typeof options.headers === 'undefined') {
    options.headers = {};
  }

  // Default method is GET
  if (typeof options.method === 'undefined') {
    options.method = 'get';
  }

  if (options.method.toLowerCase() === 'get' && isObject(options.data)) {
    url = buildURL(url, options.data);
  }

  // When post
  if (options.method.toLowerCase() === 'post') {
    // default content-type is application/json
    if (typeof options.headers['Content-Type'] === 'undefined') {
      options.headers['Content-Type'] = 'application/json';
    }
    if (options.headers['Content-Type'] === 'application/json') {
      options.body = JSON.stringify(options.data);
    }
  }

  // parse interceptors
  const interceptors = honoka.interceptors;
  const reversedInterceptors = reduce(
    interceptors,
    (array, interceptor) => [interceptor, ...array],
    []
  );

  forEach(reversedInterceptors, interceptor => {
    if (interceptor.request) {
      options = interceptor.request(options);
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
        honoka.response = response;

        response.clone().text().then(responseData => {
          const ct = response.headers.get('Content-Type');
          if (ct && ct.match(/application\/json/i)) {
            responseData = JSON.parse(responseData);
          }

          forEach(reversedInterceptors, interceptor => {
            if (interceptor.response) {
              honoka.response = response = interceptor.response(
                responseData,
                response
              );
            }
          });

          if (response.status >= 200 && response.status < 400) {
            resolve(responseData);
          } else {
            reject(new Error('Not expected status code', response.status));
          }
        });
      })
      .catch(e => {
        reject(e);
      });
  });
}

// honoka default options
honoka.defaults = {
  timeout: 0,
  baseURL: ''
};

// honoka interceptors injections
honoka.interceptors = [];

honoka.interceptors.register = interceptor => {
  honoka.interceptors.push(interceptor);
  return () => {
    const index = honoka.interceptors.indexOf(interceptor);
    if (index >= 0) {
      honoka.interceptors.splice(index, 1);
    }
  };
};

honoka.interceptors.clear = () => {
  honoka.interceptors = [];
};

// Let's export the library version
honoka.version = process.env.HONOKA_VERSION;

// Provide aliases for supported request methods
forEach(
  ['get', 'delete', 'head', 'options', 'post', 'put', 'patch'],
  method => {
    honoka[method] = (url, options) => {
      return honoka(url, {
        method,
        ...options
      });
    };
  }
);

export default honoka;
