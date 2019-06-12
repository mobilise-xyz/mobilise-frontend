import usersConstants from '../_constants/users.constants';
import usersService from '../_services/users.service';

import history from '../_helpers/history';
import alertActions from './alert.actions';

const get = uid => {
  const getSuccess = user => {
    return { type: usersConstants.GET, user };
  };

  return dispatch => {
    usersService.get(uid).then(user => {
      dispatch(getSuccess(user));
    });
  };
};

// What is the difference between updateContactState and updateContactPreferences you ask?
// updateContactState updates the internal redux store, whereas updateContactPreferences is called on submit
// and makes an API request.
const updateContactState = ({ email, text }) => {
  return {
    type: usersConstants.UPDATE_CONTACT_STATE,
    email,
    text
  };
};

const updateContactPreferences = (uid, email, text) => {
  const request = () => {
    return { type: usersConstants.UPDATE_CONTACT_REQUEST };
  };
  const success = () => {
    return { type: usersConstants.UPDATE_CONTACT_SUCCESS };
  };
  const failure = () => {
    return { type: usersConstants.UPDATE_CONTACT_SUCCESS };
  };

  return dispatch => {
    dispatch(request());

    usersService.updateContactPreferences(uid, email, text).then(
      () => {
        dispatch(success());

        dispatch(alertActions.success('Successfully updated preferences!'));
      },
      () => {
        dispatch(failure());
        dispatch(alertActions.error('Failed to update preferences!'));
      }
    );
  };
};

const login = (username, password) => {
  const request = user => {
    return { type: usersConstants.LOGIN_REQUEST, user };
  };
  const success = user => {
    return { type: usersConstants.LOGIN_SUCCESS, user };
  };
  const failure = error => {
    return { type: usersConstants.LOGIN_FAILURE, error };
  };

  return dispatch => {
    dispatch(request({ username }));

    usersService.login(username, password).then(
      user => {
        dispatch(success(user));

        // If volunteer first login then redirect to availability screen.
        if (!user.isAdmin && !user.lastLogin) {
          history.push('/welcome');
          dispatch(
            alertActions.success(
              'Welcome to Mobilise! Please fill in your preferences below.'
            )
          );
        } else {
          history.push('/');
        }
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error('Login failed!'));
      }
    );
  };
};

const logout = () => {
  usersService.logout();
  return { type: usersConstants.LOGOUT };
};

const usersActions = {
  get,
  updateContactPreferences,
  updatePreferenceState: updateContactState,
  login,
  logout
};

export default usersActions;
