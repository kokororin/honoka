import buildUrl from 'build-url';
import { trimStart, trimEnd } from './utils';

if (!global.Promise) {
  throw new Error(
    'Cannot find Promise in your environment. You may need a promise-polyfill.'
  );
}

export default function honoka(url, options = {}) {
  options = Object.assign({}, honoka.defaults, options);

  if (!/^(?:[a-z]+:)?\/\//i.test(url)) {
    url = trimEnd(options.baseURL, '/') + '/' + trimStart(url, '/');
  }

  if (typeof options.headers === 'undefined') {
    options.headers = {};
  }

  // Default method is GET
  if (typeof options.method === 'undefined') {
    options.method = 'get';
  }

  if (
    options.method.toLowerCase() === 'get' &&
    typeof options.data === 'object'
  ) {
    url = buildUrl(url, {
      queryParams: options.data
    });
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

  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('Request timeout'));
    }, options.timeout);
    fetch(url, options)
      .then(response => {
        clearTimeout(timeoutId);
        if (response.status >= 200 && response.status < 400) {
          const ct = response.headers.get('Content-Type');
          if (ct && ct.match(/application\/json/i)) {
            resolve(response.json());
          } else {
            resolve(response.text());
          }
        }
        reject(new Error('Not expected status code'));
      })
      .catch(e => {
        clearTimeout(timeoutId);
        reject(e);
      });
  });
}

honoka.defaults = {
  timeout: 10e3,
  baseURL: ''
};

honoka.version = process.env.HONOKA_VERSION;

Array.prototype.forEach.call(
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
