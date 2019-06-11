import userConstants from '../_constants/user.constants';

const authentication = (state = {}, action) => {
  switch (action.type) {
    case userConstants.GET:
      return {
        firstName: action.user.firstName,
        lastName: action.user.lastName
      };
    default:
      return state;
  }
};

export default authentication;
