import usersConstants from '../_constants/users.constants';
import usersService from '../_services/users.service';

import history from '../_helpers/history';
import alertActions from './alert.actions';

const get = uid => {
  const getSuccess = user => {
    return { type: usersConstants.GET, user };
  };

  return dispatch => {
    usersService.get(uid).then(resp => {
      const { user } = resp;
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
    return { type: usersConstants.UPDATE_CONTACT_FAILURE };
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

const submitFeedback = (uid, feedback) => {
  const request = () => {
    return { type: usersConstants.FEEDBACK_REQUEST };
  };
  const success = () => {
    return { type: usersConstants.FEEDBACK_SUCCESS };
  };
  const failure = () => {
    return { type: usersConstants.FEEDBACK_FAILURE };
  };

  return dispatch => {
    dispatch(request());

    usersService.submitFeedback(uid, feedback).then(
      () => {
        dispatch(success());

        dispatch(alertActions.success('Your feedback has been submitted!'));
      },
      () => {
        dispatch(failure());
        dispatch(alertActions.error('Your feedback has not been submitted.'));
      }
    );
  };
};

const register = (firstName, lastName, email, telephone, password, token) => {
  const request = () => {
    return { type: usersConstants.REGISTER_REQUEST };
  };
  const success = user => {
    return { type: usersConstants.REGISTER_SUCCESS, user };
  };
  const failure = error => {
    return { type: usersConstants.REGISTER_FAILURE, error };
  };

  return dispatch => {
    dispatch(request());

    usersService
      .register(firstName, lastName, email, telephone, password, token)
      .then(
        () => {
          dispatch(success());
          history.push('/');
          dispatch(
            alertActions.success(
              'Successfully created an account! Please log in!'
            )
          );
        },
        error => {
          dispatch(failure(error));
          dispatch(alertActions.error(error.response.data.message));
        }
      );
  };
};

const changePassword = (oldPassword, newPassword) => {
  const request = () => {
    return { type: usersConstants.CHANGEPASSWORD_REQUEST };
  };
  const success = result => {
    return { type: usersConstants.CHANGEPASSWORD_SUCCESS, result };
  };
  const failure = result => {
    return { type: usersConstants.CHANGEPASSWORD_FAILURE, result };
  };

  return dispatch => {
    dispatch(request());

    usersService.changePassword(oldPassword, newPassword).then(
      result => {
        dispatch(success(result));
        dispatch(alertActions.success('Successfully changed password!'));
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error.response.data.message));
      }
    );
  };
};

const resetPassword = (email, newPassword, token) => {
  const request = () => {
    return { type: usersConstants.RESETPASSWORD_REQUEST };
  };
  const success = result => {
    return { type: usersConstants.RESETPASSWORD_SUCCESS, result };
  };
  const failure = result => {
    return { type: usersConstants.RESETPASSWORD_FAILURE, result };
  };

  return dispatch => {
    dispatch(request());

    usersService.resetPassword(email, newPassword, token).then(
      result => {
        dispatch(success(result));
        history.push('/');
        dispatch(alertActions.success('Successfully reset password!'));
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error.response.data.message));
      }
    );
  };
};

const forgotPassword = email => {
  const request = () => ({ type: usersConstants.FORGOTPASSWORD_REQUEST });
  const success = result => ({
    type: usersConstants.FORGOTPASSWORD_SUCCESS,
    result
  });
  const failure = error => ({
    type: usersConstants.FORGOTPASSWORD_FAILURE,
    error
  });

  return dispatch => {
    dispatch(request());

    usersService.forgotPassword(email).then(
      ({ result }) => {
        dispatch(success(result));
        dispatch(
          alertActions.success(
            'We have emailed instructions to reset your password if an account with that email exists.'
          )
        );
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error.response.data.message));
      }
    );
  };
};

const invite = (email, isAdmin) => {
  const request = () => ({ type: usersConstants.INVITE_REQUEST });
  const success = result => ({
    type: usersConstants.INVITE_SUCCESS,
    result
  });
  const failure = error => ({
    type: usersConstants.INVITE_FAILURE,
    error
  });

  return dispatch => {
    dispatch(request());

    usersService.invite(email, isAdmin).then(
      ({ contributions }) => {
        dispatch(success(contributions));
        dispatch(alertActions.success('Successfully invited volunteer!'));
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error(error.response.data.message));
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
        } else {
          history.push('/');
        }
      },
      error => {
        usersService.logout();
        dispatch(failure(error));
        dispatch(alertActions.error(error.response.data.message));
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
  invite,
  changePassword,
  resetPassword,
  forgotPassword,
  updateContactPreferences,
  updatePreferenceState: updateContactState,
  submitFeedback,
  login,
  register,
  logout
};

export default usersActions;
