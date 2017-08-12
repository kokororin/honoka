import fetchMock from 'fetch-mock';
import honoka from '../src/honoka';
import { buildURL } from '../src/utils';
import pkg from '../package.json';

const mockJsonResponse = (url = '*') => {
  fetchMock.mock(url, {
    body: { hello: 'world' },
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

describe('honoka', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('buildURL() can build query strings', () => {
    let url = buildURL('http://www.google.com/s', { q: 'honoka' });
    expect(url).to.equal('http://www.google.com/s?q=honoka');
    url = buildURL('http://www.google.com/s', { q: 'honoka', ie: 'UTF-8' });
    expect(url).to.equal('http://www.google.com/s?q=honoka&ie=UTF-8');
    url = buildURL('http://www.google.com/s?q=honoka', { ie: 'UTF-8' });
    expect(url).to.equal('http://www.google.com/s?q=honoka&ie=UTF-8');
  });

  it('honoka.version should return a version string', () => {
    expect(honoka.version).to.equal(pkg.version);
  });

  it('honoka() should return a body when status is 200', async () => {
    mockJsonResponse();
    const response = await honoka('http://www.google.com');
    expect(response).to.deep.equal({ hello: 'world' });
  });

  it('honoka.get() should return a body when status is 200', async () => {
    mockJsonResponse();
    const response = await honoka('http://www.google.com');
    expect(response).to.deep.equal({ hello: 'world' });
  });

  it('honoka() should build query strings correctly', async () => {
    mockJsonResponse('http://www.google.com/s?q=honoka&ie=UTF-8');
    const response = await honoka('http://www.google.com/s', {
      data: {
        q: 'honoka',
        ie: 'UTF-8'
      }
    });
    expect(response).to.deep.equal({ hello: 'world' });
  });

  it('honoka() should throw Error when status >= 400', async () => {
    fetchMock.mock('*', { status: 400 });
    let err;
    try {
      const response = await honoka('http://www.google.com');
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
      const response = await honoka('http://www.google.com', {
        timeout: 500
      });
    } catch (e) {
      err = e;
    }
    expect(() => {
      throw err;
    }).to.throw(/Request timeout/);
  });
});
