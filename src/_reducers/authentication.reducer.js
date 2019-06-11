import usersConstants from '../_constants/users.constants';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

const authentication = (state = initialState, action) => {
  switch (action.type) {
    case usersConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case usersConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case usersConstants.LOGIN_FAILURE:
      return {};
    case usersConstants.LOGOUT:
      return {};
    default:
      return state;
  }
};

export default authentication;
