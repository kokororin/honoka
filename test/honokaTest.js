import { expect } from 'chai';
import honoka from '../src/honoka';
import pkg from '../package.json';

const EXPRESS_BASE_URL = 'http://localhost:3001';

describe('honoka', () => {
  beforeEach(() => {
    honoka.defaults.baseURL = '';
    honoka.interceptors.clear();
  });

  it('honoka.version should return a version string', () => {
    expect(honoka.version).to.equal(pkg.version);
  });

  it('honoka() should return a body when status is 200', async () => {
    const data = await honoka(`${EXPRESS_BASE_URL}/with/ok`);
    expect(data).to.equal('ok');
  });

  it('honoka() should build query strings correctly', async () => {
    const query = {
      q: 'honoka',
      ie: 'UTF-8'
    };
    const data = await honoka(`${EXPRESS_BASE_URL}/get/query`, {
      data: query
    });
    expect(data).to.deep.equal(query);
  });

  it('honoka() should convert JSON Object when Content-Type is application/json', async () => {
    const data = await honoka(`${EXPRESS_BASE_URL}/with/json`);
    expect(data.hello).to.equal('world');
  });

  it('honoka.response should return the fetch response object', async () => {
    await honoka(`${EXPRESS_BASE_URL}/with/json`);
    expect(
      honoka.response.headers.get('Content-Type').startsWith('application/json')
    ).to.equal(true);
  });

  it('honoka() should throw Error when status >= 400', async () => {
    let err;
    try {
      await honoka(`${EXPRESS_BASE_URL}/with/error`);
    } catch (e) {
      err = e;
    }
    expect(() => {
      throw err;
    }).to.throw(/Not expected status code/);
  });

  it('honoka() should throw Error when timeout', async () => {
    let err;
    try {
      await honoka(`${EXPRESS_BASE_URL}/with/timeout`, {
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
    const data = await honoka(`${EXPRESS_BASE_URL}/with/post`);
    expect(data).to.equal('post');
  });

  it('honoka.interceptors.register() should register a response interceptor', async () => {
    honoka.interceptors.register({
      response: (data, response) => {
        response.test = 'test';
        return [data, response];
      }
    });
    await honoka(`${EXPRESS_BASE_URL}/with/json`);
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

  it('honoka.defaults should work', async () => {
    honoka.defaults.baseURL = EXPRESS_BASE_URL;
    const data = await honoka('/with/ok');
    expect(data).to.deep.equal('ok');
  });
});
