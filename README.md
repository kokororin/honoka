# honoka

[![npm version](https://img.shields.io/npm/v/honoka.svg)](https://www.npmjs.org/package/honoka)
[![Build Status](https://travis-ci.org/kokororin/honoka.svg?branch=master)](https://travis-ci.org/kokororin/honoka)
[![Coverage Status](https://coveralls.io/repos/github/kokororin/honoka/badge.svg?branch=master)](https://coveralls.io/github/kokororin/honoka?branch=master)

Just a fetch() API wrapper for both Browser and Node.js.

## Features

- Same as [fetch() API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- Timeout
- Interceptors before request and response


## Installing

Using npm:

```bash
$ npm install honoka
```

Using cdn:

```html
<script src="https://unpkg.com/honoka/lib/honoka.min.js"></script>
```

## Example

Performing a `GET` request

```js
// Make a request for a user with a given ID
honoka.get('/user?ID=12345')
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.log(error);
  });

// Optionally the request above could also be done as
honoka.get('/user', {
    data: {
      ID: 12345
    }
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.log(error);
  });
```

Performing a `POST` request

```js
honoka.post('/user', {
    data: {
      firstName: 'Fred',
      lastName: 'Flintstone'
    }
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.log(error);
  });
```

## honoka API

Requests can be made by passing the relevant config to `honoka`.

##### honoka(options)

```js
// Send a POST request
honoka('/user/12345', {
  method: 'post',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});
```

##### honoka(url[, options])

```js
// Send a GET request (default method)
honoka('/user/12345');
```

### Request method aliases

For convenience aliases have been provided for all supported request methods.

##### honoka.get(url[, options])
##### honoka.delete(url[, options])
##### honoka.head(url[, options])
##### honoka.options(url[, options])
##### honoka.post(url[, options])
##### honoka.put(url[, options])
##### honoka.patch(url[, options])

## Request Config

These are the available config options for making requests. Same as fetch() API.

```js
{
  // `baseURL` will be prepended to `url` unless `url` is absolute.
  baseURL: 'https://some-domain.com/api/',

  // `timeout` specifies the number of milliseconds before the request times out.
  // If the request takes longer than `timeout`, the request will be aborted.
  timeout: 1000
}
```

## Config Defaults

You can specify config defaults that will be applied to every request.

### Global defaults

```js
honoka.defaults.baseURL = 'https://example.com/api';
honoka.defaults.timeout = 10e3;
honoka.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```

## Interceptors
You can intercept requests or responses before they are handled by `then`.

```js
const unregister = honoka.interceptors.register({
  request: options => {
    // Modify the options here
    const token = localStorage.getItem('token');
    if (token) {
      options.headers['X-JWT-Token'] = token;
    }
    return options;
  },
  response: (data, response) => {
    // Check responseData here
    if (data.status && data.status !== 'success') {
      alert('request error');
    }
    // Modify the data & response object
    return [data, response];
  }
})

// Unregister your interceptor
unregister();
```

## Changelog

For changelogs, see [Release Notes](https://github.com/kokororin/honoka/releases).

## License

MIT
