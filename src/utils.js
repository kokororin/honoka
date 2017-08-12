import keys from 'object-keys';

const spaceChars = ' \\s\u00A0';
const symbolRegex = /([[\]().?/*{}+$^:])/g;

export function trimStart(str, charlist = spaceChars) {
  charlist = (charlist + '').replace(symbolRegex, '$1');
  const re = new RegExp('^[' + charlist + ']+', 'g');
  return (str + '').replace(re, '');
}

export function trimEnd(str, charlist = spaceChars) {
  charlist = (charlist + '').replace(symbolRegex, '\\$1');
  const re = new RegExp('[' + charlist + ']+$', 'g');
  return (str + '').replace(re, '');
}

const toString = Object.prototype.toString;
const hasOwn = Object.prototype.hasOwnProperty;

export function isObject(value) {
  return value !== null && typeof value === 'object';
}

export function isArray(value) {
  return toString.call(value) === '[object Array]';
}

export function forEach(object, fn, context) {
  if (toString.call(fn) !== '[object Function]') {
    throw new TypeError('iterator must be a function');
  }

  const l = object.length;
  if (l === +l) {
    for (let i = 0; i < l; i++) {
      fn.call(context, object[i], i, object);
    }
  } else {
    for (const k in object) {
      if (Object.prototype.hasOwnProperty.call(object, k)) {
        fn.call(context, object[k], k, object);
      }
    }
  }
}

export function reduce(array, fn, initialValue) {
  let hasAcc = arguments.length >= 3;
  if (hasAcc && array.reduce) {
    return array.reduce(fn, initialValue);
  }
  if (array.reduce) {
    return array.reduce(fn);
  }

  for (let i = 0; i < array.length; i++) {
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

export function isAbsoluteURL(url) {
  return /^(?:[a-z]+:)?\/\//i.test(url);
}

export function buildURL(url, params) {
  if (!params) {
    return url;
  }

  const uris = [];

  forEach(keys(params), key => {
    let value = params[key];
    if (isObject(value)) {
      value = JSON.stringify(value);
    }
    uris.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
  });

  url += (url.indexOf('?') === -1 ? '?' : '&') + uris.join('&');

  return url;
}
