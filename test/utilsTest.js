import { expect } from 'chai';
import {
  buildURL,
  isAbsoluteURL,
  isNode,
  normalizeHeaders,
  trimStart,
  trimEnd
} from '../src/utils';

const BASE_URL = 'http://example.com';

describe('utils', () => {
  it('utils.buildURL() can build query strings', () => {
    const url = buildURL(`${BASE_URL}/s`, { q: 'honoka' });
    expect(url).to.equal(`${BASE_URL}/s?q=honoka`);
  });

  it('utils.buildURL() can build query strings with two parameters', () => {
    const url = buildURL(`${BASE_URL}/s`, {
      q: 'honoka',
      ie: 'UTF-8'
    });
    expect(url).to.equal(`${BASE_URL}/s?q=honoka&ie=UTF-8`);
  });

  it('utils.buildURL() can build query strings with a query-given url', () => {
    const url = buildURL(`${BASE_URL}/s?q=honoka`, { ie: 'UTF-8' });
    expect(url).to.equal(`${BASE_URL}/s?q=honoka&ie=UTF-8`);
  });

  it('utils.isAbsoluteURL() can determine whether url is absolute', () => {
    expect(isAbsoluteURL(BASE_URL)).to.equal(true);
    expect(isAbsoluteURL('/s')).to.equal(false);
  });

  it('utils.normalizeHeaders() can normalize headers', () => {
    const headers = {
      'content-type': 'application/json'
    };
    normalizeHeaders(headers);
    expect(headers).to.have.property('Content-Type', 'application/json');
    expect(headers).to.not.have.property('content-type');
  });

  it('utils.trimStart() should remove leading whitespace or specified characters', () => {
    const string = trimStart('/honoka', '/');
    expect(string).to.equal('honoka');
  });

  it('utils.trimEnd() should remove trailing whitespace or specified characters', () => {
    const string = trimEnd('honoka/', '/');
    expect(string).to.equal('honoka');
  });

  it('utils.isNode() should return false', () => {
    expect(isNode()).to.equal(false);
  });
});
