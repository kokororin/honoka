import fetchMock from 'fetch-mock';
import honoka from '../src/honoka';
import {
  buildURL,
  isAbsoluteURL,
  normalizeHeaders,
  trimStart,
  trimEnd
} from '../src/utils';
import pkg from '../package.json';

const baseURL = 'http://www.google.com';

const mockJsonResponse = (url = '*', method = 'get') => {
  fetchMock.mock(url, {
    body: { hello: 'world' },
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

describe('honoka', () => {
  afterEach(() => {
    fetchMock.restore();
    honoka.defaults.baseURL = '';
    honoka.interceptors.clear();
  });

  it('utils.buildURL() can build query strings', () => {
    const url = buildURL(`${baseURL}/s`, { q: 'honoka' });
    expect(url).to.equal(`${baseURL}/s?q=honoka`);
  });

  it('utils.buildURL() can build query strings with two parameters', () => {
    const url = buildURL(`${baseURL}/s`, {
      q: 'honoka',
      ie: 'UTF-8'
    });
    expect(url).to.equal(`${baseURL}/s?q=honoka&ie=UTF-8`);
  });

  it('utils.buildURL() can build query strings with a query-given url', () => {
    const url = buildURL(`${baseURL}/s?q=honoka`, { ie: 'UTF-8' });
    expect(url).to.equal(`${baseURL}/s?q=honoka&ie=UTF-8`);
  });

  it('utils.isAbsoluteURL() can determine whether url is absolute', () => {
    expect(isAbsoluteURL(baseURL)).to.equal(true);
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

  it('honoka.version should return a version string', () => {
    expect(honoka.version).to.equal(pkg.version);
  });

  it('honoka() should return a body when status is 200', async () => {
    mockJsonResponse();
    const data = await honoka(baseURL);
    expect(data).to.deep.equal({ hello: 'world' });
  });

  it('honoka() should build query strings correctly', async () => {
    mockJsonResponse(`${baseURL}/s?q=honoka&ie=UTF-8`);
    const data = await honoka(`${baseURL}/s`, {
      data: {
        q: 'honoka',
        ie: 'UTF-8'
      }
    });
    expect(data).to.deep.equal({ hello: 'world' });
  });

  it('honoka() should get the body object when fetching a json', async () => {
    mockJsonResponse();
    const data = await honoka(baseURL);
    expect(data.hello).to.equal('world');
  });

  it('honoka.response should return the fetch response object', async () => {
    mockJsonResponse();
    await honoka(baseURL);
    expect(honoka.response.headers.get('Content-Type')).to.equal(
      'application/json'
    );
  });

  it('honoka.get() should return a body when status is 200', async () => {
    mockJsonResponse();
    const data = await honoka(baseURL);
    expect(data).to.deep.equal({ hello: 'world' });
  });

  it('honoka() should throw Error when status >= 400', async () => {
    fetchMock.mock('*', { status: 400 });
    let err;
    try {
      await honoka(baseURL);
    } catch (e) {
      err = e;
    }
    expect(() => {
      throw err;
    }).to.throw(/Not expected status code/);
  });

  it('honoka() should throw Error when timeout', async () => {
    const delay = new Promise(resolve => setTimeout(resolve, 1000));
    fetchMock.mock('*', delay);
    let err;
    try {
      await honoka(baseURL, {
        timeout: 500
      });
    } catch (e) {
      err = e;
    }
    expect(() => {
      throw err;
    }).to.throw(/Request timeout/);
  });

  it('honoka.interceptors.register() should register a request interceptor', async () => {
    honoka.interceptors.register({
      request: options => {
        options.method = 'post';
        return options;
      }
    });
    mockJsonResponse('*', 'post');
    const data = await honoka(baseURL);
    expect(data).to.deep.equal({ hello: 'world' });
  });

  it('honoka.interceptors.register() should register a response interceptor', async () => {
    honoka.interceptors.register({
      response: (data, response) => {
        response.test = 'test';
        return [data, response];
      }
    });
    mockJsonResponse();
    await honoka(baseURL);
    expect(honoka.response.test).to.equal('test');
  });

  it('honoka.interceptors.clear() should clear all interceptors', () => {
    honoka.interceptors.register({
      response: null
    });
    expect(honoka.interceptors.get().length).to.equal(1);
    honoka.interceptors.clear();
    expect(honoka.interceptors.get().length).to.equal(0);
  });

  it('honoka() should convert JSON Object when Content-Type is application/json', async () => {
    mockJsonResponse((url, options) => {
      return options.body === JSON.stringify({ hello: 'world' });
    }, 'post');
    const data = await honoka.post(baseURL, {
      data: {
        hello: 'world'
      }
    });
    expect(data).to.deep.equal({ hello: 'world' });
  });

  it('honoka.defaults should work', async () => {
    honoka.defaults.baseURL = baseURL;
    mockJsonResponse(`${baseURL}/s`);
    const data = await honoka('/s');
    expect(data).to.deep.equal({ hello: 'world' });
  });
});
