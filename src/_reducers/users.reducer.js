import usersConstants from '../_constants/users.constants';

const users = (state = {}, action) => {
  switch (action.type) {
    case usersConstants.GET:
      return {
        loading: false,
        firstName: action.user.firstName,
        lastName: action.user.lastName,
        contactPreferences: {
          email: action.user.contactPreferences.email,
          text: action.user.contactPreferences.text
        }
      };

    case usersConstants.UPDATE_CONTACT_STATE:
      return {
        ...state,
        contactPreferences: {
          email: action.email,
          text: action.text
        }
      };
    case usersConstants.UPDATE_CONTACT_REQUEST:
    case usersConstants.UPDATE_CONTACT_SUCCESS:
    case usersConstants.UPDATE_CONTACT_FAILURE:
    case usersConstants.FEEDBACK_REQUEST:
    case usersConstants.FEEDBACK_SUCCESS:
    case usersConstants.FEEDBACK_FAILURE:
    default:
      return state;
  }
};

export default users;
