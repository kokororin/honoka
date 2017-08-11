# honoka

[![npm version](https://img.shields.io/npm/v/honoka.svg)](https://www.npmjs.org/package/honoka)
[![Build Status](https://travis-ci.org/kokororin/honoka.svg?branch=master)](https://travis-ci.org/kokororin/honoka)

Just a fetch() API wrapper

## Features

- Same as [fetch() API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- Timeout


## Installing

Using npm:

```bash
$ npm install honoka
```

Using cdn:

```html
<script src="https://unpkg.com/honoka"></script>
```

## Example

Performing a `GET` request

```js
// Make a request for a user with a given ID
honoka.get('/user?ID=12345')
  .then(function (data) {
    console.log(data);
  })
  .catch(function (error) {
    console.log(error);
  });

// Optionally the request above could also be done as
honoka.get('/user', {
    data: {
      ID: 12345
    }
  })
  .then(function (data) {
    console.log(data);
  })
  .catch(function (error) {
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
  .then(function (data) {
    console.log(data);
  })
  .catch(function (error) {
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


## License

MIT
