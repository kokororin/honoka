import { expect } from 'chai';
import forEach from 'foreach';
import merge from 'merge-options';
import honoka from '../src/honoka';
import pkg from '../package.json';

const EXPRESS_BASE_URL = process.env.EXPRESS_BASE_URL;
const GET_QUERY = {
  q: 'honoka',
  ie: 'UTF-8'
};
const POST_DATA = { name: 'honoka' };
const ORIGINAL_DEFAULTS = merge(honoka.defaults);

describe('honoka', () => {
  afterEach(() => {
    forEach(ORIGINAL_DEFAULTS, (value, key) => {
      honoka.defaults[key] = typeof value === 'object' ? merge(value) : value;
    });

    honoka.interceptors.clear();
  });

  it('honoka.version should return a version string', () => {
    expect(honoka.version).to.equal(pkg.version);
  });

  it('honoka() should return a body when status is 200', async () => {
    const response = await honoka(`${EXPRESS_BASE_URL}/with/ok`);
    expect(response.data).to.equal('ok');
  });

  it('honoka() should build query strings correctly', async () => {
    const response = await honoka(`${EXPRESS_BASE_URL}/get/query`, {
      data: GET_QUERY
    });
    expect(response.data).to.deep.equal(GET_QUERY);
  });

  it('honoka() should transform JSON Object when Content-Type is "application/json"', async () => {
    const response = await honoka(`${EXPRESS_BASE_URL}/with/json`);
    expect(response.data.hello).to.equal('world');
  });

  it('honoka() should transform JSON Object when dataType is "json"', async () => {
    const response = await honoka(`${EXPRESS_BASE_URL}/with/json`, {
      dataType: 'json'
    });
    expect(response.data.hello).to.equal('world');
  });

  it('honoka() should transform Text when dataType is "text"', async () => {
    const response = await honoka(`${EXPRESS_BASE_URL}/with/ok`, {
      dataType: 'text'
    });
    expect(response.data).to.equal('ok');
  });

  it('honoka() should transform Blob Object when dataType is "blob"', async () => {
    const response = await honoka(`${EXPRESS_BASE_URL}/with/blob`, {
      dataType: 'blob'
    });
    expect(response.data instanceof Blob).to.be.true;
  });

  it('honoka() should transform ArrayBuffer Object when dataType is "arraybuffer"', async () => {
    const response = await honoka(`${EXPRESS_BASE_URL}/with/blob`, {
      dataType: 'arraybuffer'
    });
    expect(response.data instanceof ArrayBuffer).to.be.true;
  });

  it('honoka() should throw Error when dataType is "buffer"', () => {
    expect(honoka(`${EXPRESS_BASE_URL}/with/blob`, { dataType: 'buffer' })).to
      .be.rejected;
  });

  it('honoka.post() should post JSON correctly', async () => {
    const response = await honoka.post(`${EXPRESS_BASE_URL}/post/param`, {
      headers: {
        'Content-Type': 'application/json'
      },
      data: POST_DATA
    });
    expect(response.data).to.deep.equal(POST_DATA);
  });

  it('honoka.post() should post params correctly', async () => {
    const response = await honoka.post(`${EXPRESS_BASE_URL}/post/param`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: POST_DATA
    });
    expect(response.data).to.deep.equal(POST_DATA);
  });

  it('honoka.post() should post FormData correctly', async () => {
    const formData = new FormData();
    // eslint-disable-next-line guard-for-in
    for (const key in POST_DATA) {
      formData.append(key, POST_DATA[key]);
    }
    const response = await honoka.post(`${EXPRESS_BASE_URL}/post/formdata`, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    });
    expect(response.data).to.deep.equal(POST_DATA);
  });

  it('response should return the fetch response object', async () => {
    let response = await honoka(`${EXPRESS_BASE_URL}/with/json`);
    expect(response.headers.get('Content-Type').startsWith('application/json'))
      .to.be.true;

    response = await honoka(`${EXPRESS_BASE_URL}/with/ok`);
    expect(response.headers.get('Content-Type').startsWith('text/html')).to.be
      .true;
  });

  it('honoka() should throw Error when status >= 400', () => {
    expect(honoka(`${EXPRESS_BASE_URL}/with/error`)).to.be.rejected;
  });

  it('honoka() should throw Error when timeout', () => {
    expect(
      honoka(`${EXPRESS_BASE_URL}/with/timeout`, {
        timeout: 500
      })
    ).to.be.rejected;
  });

  it('expectedStatus should work', () => {
    expect(
      honoka(`${EXPRESS_BASE_URL}/with/error`, {
        expectedStatus: () => true
      })
    ).to.be.fulfilled;
  });

  it('AbortController should work', () => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    expect(
      honoka(`${EXPRESS_BASE_URL}/with/timeout`, {
        signal
      })
    ).to.be.rejected;

    abortController.abort();
  });

  it('honoka.interceptors.register() should register a request interceptor', async () => {
    honoka.interceptors.register({
      request: options => {
        options.method = 'post';
        return options;
      }
    });
    const response = await honoka(`${EXPRESS_BASE_URL}/with/post`);
    expect(response.data).to.equal('post');
  });

  it('honoka.interceptors.register() should register a response interceptor', async () => {
    honoka.interceptors.register({
      response: response => {
        response.test = 'test';
        return response;
      }
    });
    const response = await honoka(`${EXPRESS_BASE_URL}/with/json`);
    expect(response.test).to.equal('test');
  });

  it('honoka.interceptors.register() should register a rejected response interceptor', async () => {
    honoka.interceptors.register({
      response: response => {
        if (response.data.code !== 200) {
          return new Error('Something error');
        }
        return response;
      }
    });
    expect(
      honoka.post(`${EXPRESS_BASE_URL}/post/param`, {
        data: {
          code: 400,
          message: 'Something error'
        }
      })
    ).to.be.rejectedWith('Something error');
  });

  it('honoka.interceptors.clear() should clear all interceptors', () => {
    honoka.interceptors.register({
      response: null
    });
    expect(honoka.interceptors.get().length).to.equal(1);
    honoka.interceptors.clear();
    expect(honoka.interceptors.get().length).to.equal(0);
  });

  it('honoka should throw Error when request interceptor is not valid', () => {
    honoka.interceptors.register({
      request() {}
    });
    expect(() => honoka(`${EXPRESS_BASE_URL}/with/json`)).to.throw;
  });

  it('honoka should throw Error when response interceptor is not valid', () => {
    honoka.interceptors.register({
      response() {}
    });
    expect(honoka(`${EXPRESS_BASE_URL}/with/json`)).to.be.rejected;
  });

  it('honoka.defaults.baseURL should work', async () => {
    honoka.defaults.baseURL = EXPRESS_BASE_URL;
    const response = await honoka('/with/ok');
    expect(response.data).to.deep.equal('ok');
  });

  it('honoka should combine headers', async () => {
    honoka.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
    const response = await honoka(`${EXPRESS_BASE_URL}/get/header`, {
      headers: {
        'X-Name': 'honoka'
      }
    });
    expect(response.data['x-requested-with']).to.equal('XMLHttpRequest');
    expect(response.data['x-name']).to.equal('honoka');
  });

  it('honoka.defaults.headers["post"] should work', async () => {
    honoka.defaults.headers.post['X-Name'] = 'kotori';
    const response = await honoka.post(`${EXPRESS_BASE_URL}/post/header`);
    expect(response.data['x-name']).to.equal('kotori');
  });
});
