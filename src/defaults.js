import forEach from 'foreach';
// honoka default options
const defaults = {
  baseURL: '',
  timeout: 0,
  method: 'get',
  headers: {},
  dataType: 'auto',
  expectedStatus(status) {
    return status >= 200 && status < 400;
  }
};

// set the default content-type of request methods
forEach(['delete', 'get', 'head'], method => {
  defaults.headers[method] = {};
});

forEach(['post', 'put', 'patch'], method => {
  defaults.headers[method] = {
    'Content-Type': 'application/json'
  };
});

export default defaults;
