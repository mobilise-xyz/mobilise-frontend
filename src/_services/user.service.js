import axios from 'axios';
import utils from '../_helpers/utils';
import history from '../_helpers/history';

const logout = () => {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
};

const login = (email, password) => {
  return axios
    .post('/auth/login', {
      email,
      password
    })
    .then(utils.handleResponse)
    .then(({ uid, isAdmin, lastLogin, token }) => {
      // Store user details and JWT token in localStorage to keep user logged in between page refreshes.
      localStorage.setItem(
        'user',
        JSON.stringify({
          uid,
          isAdmin,
          lastLogin,
          token
        })
      );

      return {
        uid,
        isAdmin,
        lastLogin,
        token
      };
    })
    .catch(err => {
      console.log(err);
      logout();
      history.location.reload(true);
    });
};

const userService = {
  login,
  logout
};

export default userService;
