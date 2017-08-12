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

export function isObject(value) {
  return value !== null && typeof value === 'object';
}

export function isAbsoluteURL(url) {
  return /^(?:[a-z]+:)?\/\//i.test(url);
}

export function buildURL(url, params) {
  if (!params) {
    return url;
  }

  const uris = [];

  keys(params).forEach(key => {
    let value = params[key];
    if (isObject(value)) {
      value = JSON.stringify(value);
    }
    uris.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
  });

  url += (url.indexOf('?') === -1 ? '?' : '&') + uris.join('&');

  return url;
}
