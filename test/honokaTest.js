import fetchMock from 'fetch-mock';
import honoka from '../src/honoka';
import { buildURL } from '../src/utils';
import pkg from '../package.json';

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
  });

  it('honoka.buildURL() can build query strings', () => {
    const url = buildURL('http://www.google.com/s', { q: 'honoka' });
    expect(url).to.equal('http://www.google.com/s?q=honoka');
  });

  it('honoka.buildURL() can build query strings with two parameters', () => {
    const url = buildURL('http://www.google.com/s', {
      q: 'honoka',
      ie: 'UTF-8'
    });
    expect(url).to.equal('http://www.google.com/s?q=honoka&ie=UTF-8');
  });

  it('honoka.buildURL() can build query strings with a query-given url', () => {
    const url = buildURL('http://www.google.com/s?q=honoka', { ie: 'UTF-8' });
    expect(url).to.equal('http://www.google.com/s?q=honoka&ie=UTF-8');
  });

  it('honoka.version should return a version string', () => {
    expect(honoka.version).to.equal(pkg.version);
  });

  it('honoka() should return a body when status is 200', async () => {
    mockJsonResponse();
    const data = await honoka('http://www.google.com');
    expect(data).to.deep.equal({ hello: 'world' });
  });

  it('honoka() should build query strings correctly', async () => {
    mockJsonResponse('http://www.google.com/s?q=honoka&ie=UTF-8');
    const data = await honoka('http://www.google.com/s', {
      data: {
        q: 'honoka',
        ie: 'UTF-8'
      }
    });
    expect(data).to.deep.equal({ hello: 'world' });
  });

  it('honoka() should get the body object when fetching a json', async () => {
    mockJsonResponse();
    const data = await honoka('http://www.google.com');
    expect(data.hello).to.equal('world');
  });

  it('honoka.response should return the fetch response', async () => {
    mockJsonResponse();
    await honoka('http://www.google.com');
    expect(honoka.response.headers.get('Content-Type')).to.equal(
      'application/json'
    );
  });

  it('honoka.get() should return a body when status is 200', async () => {
    mockJsonResponse();
    const data = await honoka('http://www.google.com');
    expect(data).to.deep.equal({ hello: 'world' });
  });

  it('honoka() should throw Error when status >= 400', async () => {
    fetchMock.mock('*', { status: 400 });
    let err;
    try {
      await honoka('http://www.google.com');
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
      await honoka('http://www.google.com', {
        timeout: 500
      });
    } catch (e) {
      err = e;
    }
    expect(() => {
      throw err;
    }).to.throw(/Request timeout/);
  });

  it('honoka.interceptors.regsiter() should register a request interceptor', async () => {
    honoka.interceptors.register({
      request: options => {
        options.method = 'post';
        return options;
      }
    });
    mockJsonResponse('*', 'post');
    const data = await honoka('http://www.google.com');
    expect(data).to.deep.equal({ hello: 'world' });
  });

  it('honoka.interceptors.regsiter() should register a response interceptor', async () => {
    honoka.interceptors.register({
      response: (data, response) => {
        response.test = 'test';
        return response;
      }
    });
    mockJsonResponse();
    await honoka('http://www.google.com');
    expect(honoka.response.test).to.equal('test');
  });

  it('honoka.defaults should work', async () => {
    honoka.defaults.baseURL = 'http://www.google.com';
    mockJsonResponse('http://www.google.com/s');
    const data = await honoka('/s');
    expect(data).to.deep.equal({ hello: 'world' });
  });
});
