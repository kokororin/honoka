import { expect } from 'chai';
import honoka from '../src/honoka';
import pkg from '../package.json';

const EXPRESS_BASE_URL = 'http://localhost:3001';
const GET_QUERY = {
  q: 'honoka',
  ie: 'UTF-8'
};
const POST_DATA = { name: 'honoka' };

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
    const data = await honoka(`${EXPRESS_BASE_URL}/get/query`, {
      data: GET_QUERY
    });
    expect(data).to.deep.equal(GET_QUERY);
  });

  it('honoka() should transform JSON Object when Content-Type is "application/json"', async () => {
    const data = await honoka(`${EXPRESS_BASE_URL}/with/json`);
    expect(data.hello).to.equal('world');
  });

  it('honoka() should transform JSON Object when dataType is "json"', async () => {
    const data = await honoka(`${EXPRESS_BASE_URL}/with/json`, {
      dataType: 'json'
    });
    expect(data.hello).to.equal('world');
  });

  it('honoka() should transform Blob Object when dataType is "blob"', async () => {
    const data = await honoka(`${EXPRESS_BASE_URL}/with/blob`, {
      dataType: 'blob'
    });
    expect(data instanceof Blob).to.equal(true);
  });

  it('honoka.post() should post JSON correctly', async () => {
    const data = await honoka.post(`${EXPRESS_BASE_URL}/post/param`, {
      headers: {
        'Content-Type': 'application/json'
      },
      data: POST_DATA
    });
    expect(data).to.deep.equal(POST_DATA);
  });

  it('honoka.post() should post params correctly', async () => {
    const data = await honoka.post(`${EXPRESS_BASE_URL}/post/param`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: POST_DATA
    });
    expect(data).to.deep.equal(POST_DATA);
  });

  it('honoka.post() should post FormData correctly', async () => {
    const formData = new FormData();
    // eslint-disable-next-line guard-for-in
    for (const key in POST_DATA) {
      formData.append(key, POST_DATA[key]);
    }
    const data = await honoka.post(`${EXPRESS_BASE_URL}/post/formdata`, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    });
    expect(data).to.deep.equal(POST_DATA);
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
