import axios from 'axios';
import utils from '../_helpers/utils';
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

const submitFeedback = (uid, feedback) => {
  const data = {
    feedback
  };
  const config = {
    headers: authHeader()
  };

  return axios
    .post(`/users/${uid}/feedback`, data, config)
    .then(utils.handleResponse);
};

const register = (firstName, lastName, email, telephone, password, token) => {
  return axios
    .post('/auth/register', {
      firstName,
      lastName,
      email,
      telephone,
      password,
      token
    })
    .then(utils.handleResponse);
};

const changePassword = (oldPassword, newPassword) => {
  const data = {
    oldPassword,
    newPassword
  };
  const config = {
    headers: authHeader()
  };

  return axios.put(`/users/password`, data, config).then(utils.handleResponse);
};

const invite = email => {
  const config = {
    headers: authHeader()
  };

  const data = {
    email
  };

  return axios.post(`/users/invite`, data, config).then(utils.handleResponse);
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
    .then(data => {
      const { user } = data;

      const { uid, isAdmin, lastLogin, token } = user;
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
    });
};

const usersService = {
  get,
  invite,
  changePassword,
  updateContactPreferences,
  submitFeedback,
  login,
  register,
  logout
};

export default usersService;
