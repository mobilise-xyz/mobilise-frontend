import userService from './user.service';

const handleResponse = resp => {
  console.log('handling response', resp);
  if (resp.status === 401) {
    // Logout automatically if a 401 is received.
    userService.logout();
    const { history } = this.props;
    history.location.reload(true);

    const error = resp.statusText;
    return Promise.reject(error);
  }

  return resp.data;
};

const utils = {
  handleResponse
};

export default utils;
