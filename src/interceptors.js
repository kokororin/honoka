// honoka interceptors injections
const interceptors = [];

interceptors.register = interceptor => {
  interceptors.push(interceptor);
  return () => {
    const index = interceptors.indexOf(interceptor);
    if (index >= 0) {
      interceptors.splice(index, 1);
    }
  };
};

interceptors.clear = () => {
  interceptors.length = 0;
};

export default interceptors;
