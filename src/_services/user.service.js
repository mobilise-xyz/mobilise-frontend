import axios from 'axios';
// import authHeader from '../_helpers/auth-header';

const logout = () => {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
};

// const handleResponse = response => {
//   console.log(response);
//   return response.then(data => {
//     console.log('yeet');
//     console.log(data);
//     if (!response.ok) {
//       if (response.status === 401) {
//         // auto logout if 401 response returned from api
//         logout();
//         // location.reload(true);
//       }

//       // const error = (data && data.message) || response.statusText;
//       // return Promise.reject(error);
//     }

//     return data;
//   });
// };

const login = (email, password) => {
  console.log(`POST ${email} ${password}`);
  return axios
    .post('/users/login', {
      email,
      password
    })
    .then(response => response.data)
    .then(data => {
      // Store user details and JWT token in localStorage to keep user logged in between page refreshes.
      localStorage.setItem('user', data.token);
      console.log(localStorage.getItem('user'));
      return data;
    })
    .catch(err => {
      console.log(err);
      logout();
    });
};

const userService = {
  login,
  logout
};

export default userService;
