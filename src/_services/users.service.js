import axios from 'axios';
import utils from '../_helpers/utils';
import history from '../_helpers/history';
import authHeader from '../_helpers/auth-header';

const get = uid => {
  const config = {
    headers: authHeader(),
    params: {
      id: uid
    }
  };

  return axios.get(`/users/${uid}`, config).then(utils.handleResponse);
};

const updateContactPreferences = (uid, email, text) => {
  const data = {
    contactPreferences: {
      email,
      text
    }
  };
  const config = {
    headers: authHeader()
  };

  return axios.put(`/users/${uid}/contact-preferences`, data, config);
};

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

const usersService = {
  get,
  updateContactPreferences,
  login,
  logout
};

export default usersService;
