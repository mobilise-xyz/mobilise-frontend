const handleResponse = resp => {
  console.log('Handling response', resp);
  if (resp.status !== 200) {
    // BTW 401s are handled by axios interceptor.
    console.log('ERROR HANDLE', resp);
    const error = resp.statusText;
    return Promise.reject(error);
  }

  return resp.data;
};

const utils = {
  handleResponse
};

export default utils;
