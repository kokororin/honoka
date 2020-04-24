import forEach from 'foreach';
import methods from './methods';

const spaceChars = ' \\s\u00A0';
const symbolRegex = /([[\]().?/*{}+$^:])/g;

export function trimStart(str, charlist = spaceChars) {
  charlist = (charlist + '').replace(symbolRegex, '$1');
  const re = new RegExp(`^[${charlist}]+`, 'g');
  return String(str).replace(re, '');
}

export function trimEnd(str, charlist = spaceChars) {
  charlist = (charlist + '').replace(symbolRegex, '\\$1');
  const re = new RegExp(`[${charlist}]+$`, 'g');
  return String(str).replace(re, '');
}

const toString = Object.prototype.toString;

export function isObject(value) {
  return value !== null && typeof value === 'object';
}

export function isArray(value) {
  return toString.call(value) === '[object Array]';
}

export function isString(value) {
  return typeof value === 'string';
}

export function isFormData(value) {
  return typeof FormData !== 'undefined' && value instanceof FormData;
}

export function isNode() {
  if (
    typeof global.process !== 'undefined' &&
    /* istanbul ignore next */ global.process.versions &&
    /* istanbul ignore next */ global.process.versions.node
  ) {
    /* istanbul ignore next */ return true;
  }
  return false;
}

export function isPromise(obj) {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  );
}

export function isAbsoluteURL(url) {
  return /^(?:[a-z]+:)?\/\//i.test(url);
}

export function buildURL(url, params) {
  if (!params) {
    return url;
  }

  const uris = [];

  forEach(params, (value, key) => {
    if (isObject(value)) {
      value = JSON.stringify(value);
    }
    uris.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
  });

  url += (url.indexOf('?') === -1 ? '?' : '&') + uris.join('&');

  return url;
}

export function normalizeHeaders(headers) {
  const ucFirst = str => {
    str = String(str);
    return str.charAt(0).toUpperCase() + str.substr(1);
  };

  forEach(headers, (value, key) => {
    if (methods.indexOf(key) === -1) {
      const normalizedKey = ucFirst(
        key
          .toLowerCase()
          .replace('_', '-')
          .replace(/-(\w)/g, ($0, $1) => {
            return '-' + ucFirst($1);
          })
      );
      delete headers[key];
      headers[normalizedKey] = value;
    }
  });
}
