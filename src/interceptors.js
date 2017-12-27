const interceptors = {};
const container = [];

interceptors.register = interceptor => {
  container.push(interceptor);
  return () => {
    const index = container.indexOf(interceptor);
    if (index >= 0) {
      container.splice(index, 1);
    }
  };
};

interceptors.clear = () => {
  container.length = 0;
};

interceptors.get = () => container;

export default interceptors;
