import axios from 'axios';
// import authHeader from '../_helpers/auth-header';

const logout = () => {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
};

const handleResponse = response => {
  return response.text().then(text => {
    console.log(text);
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        // location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
};

const login = (email, password) => {
  console.log(`POST ${email} ${password}`);
  return axios
    .post('/users/login', {
      email,
      password
    })
    .then(handleResponse)
    .then(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user));

      return user;
    });
};

const userService = {
  login,
  logout
};

export default userService;
