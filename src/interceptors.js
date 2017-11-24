// honoka interceptors injections
const interceptorContainer = [];

function register(interceptor) {
  interceptorContainer.push(interceptor);
  return () => {
    const index = interceptorContainer.indexOf(interceptor);
    if (index >= 0) {
      interceptorContainer.splice(index, 1);
    }
  };
}

function clear() {
  interceptorContainer.length = 0;
}

function get() {
  return interceptorContainer;
}

export default {
  register,
  clear,
  get
};
