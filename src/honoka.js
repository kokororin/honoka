import assign from 'lodash.assign';
import trimStart from 'lodash.trimstart';
import trimEnd from 'lodash.trimend';

function objectToQueryString(object) {
  return Object.keys(object)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`)
    .join('&');
}

export default function honoka(url, options = {}) {
  options = assign({}, honoka.defaults, options);

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
    url += '?' + objectToQueryString(options.data);
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
      reject(new Error('request timeout'));
    }, options.timeout);
    fetch(url, options)
      .then(response => {
        clearTimeout(timeoutId);
        if (response.status >= 200 && response.status < 400) {
          resolve(response.json());
        }
        reject(new Error('response is not OK'));
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

const methods = ['get', 'delete', 'head', 'options', 'post', 'put', 'patch'];

methods.forEach(method => {
  honoka[method] = (url, options) => {
    return honoka(url, {
      method,
      ...options
    });
  };
});
