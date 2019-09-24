import volunteerConstants from '../_constants/volunteer.constants';
import volunteerService from '../_services/volunteer.service';
import alertActions from './alert.actions';

const getAll = () => {
  const request = () => ({ type: volunteerConstants.GETALL_REQUEST });
  const success = volunteers => ({
    type: volunteerConstants.GETALL_SUCCESS,
    volunteers
  });
  const failure = error => ({
    type: volunteerConstants.GETALL_FAILURE,
    error
  });

  return dispatch => {
    dispatch(request());

    volunteerService.getAll().then(
      ({ volunteers }) => dispatch(success(volunteers)),
      error => {
        dispatch(failure(error));
      }
    );
  };
};

const getContributions = uid => {
  const request = () => ({ type: volunteerConstants.CONTRIBUTIONS_REQUEST });
  const success = contributions => ({
    type: volunteerConstants.CONTRIBUTIONS_SUCCESS,
    contributions
  });
  const failure = error => ({
    type: volunteerConstants.CONTRIBUTIONS_FAILURE,
    error
  });

  return dispatch => {
    dispatch(request());

    volunteerService.getContributions(uid).then(
      ({ contributions }) => dispatch(success(contributions)),
      error => {
        dispatch(failure(error));
      }
    );
  };
};

const getHallOfFame = () => {
  const request = () => ({ type: volunteerConstants.HALLOFFAME_REQUEST });
  const success = hallOfFame => ({
    type: volunteerConstants.HALLOFFAME_SUCCESS,
    hallOfFame
  });
  const failure = error => ({
    type: volunteerConstants.HALLOFFAME_FAILURE,
    error
  });

  return dispatch => {
    dispatch(request());

    volunteerService.getHallOfFame().then(
      ({ hallOfFame }) => dispatch(success(hallOfFame)),
      error => {
        dispatch(failure(error));
      }
    );
  };
};

const getActivity = uid => {
  const request = () => ({ type: volunteerConstants.ACTIVITY_REQUEST });
  const success = activity => ({
    type: volunteerConstants.ACTIVITY_SUCCESS,
    activity
  });
  const failure = error => ({
    type: volunteerConstants.ACTIVITY_FAILURE,
    error
  });

  return dispatch => {
    dispatch(request());

    volunteerService.getActivity(uid).then(
      ({ activity }) => dispatch(success(activity)),
      error => {
        dispatch(failure(error));
      }
    );
  };
};

const addContact = (uid, firstName, lastName, email, telephone, relation) => {
  const request = () => ({ type: volunteerConstants.ADDCONTACT_REQUEST });
  const success = contact => ({
    type: volunteerConstants.ADDCONTACT_SUCCESS,
    contact
  });
  const failure = error => ({
    type: volunteerConstants.ADDCONTACT_FAILURE,
    error
  });
  return dispatch => {
    dispatch(request());

    volunteerService
      .addContact(uid, firstName, lastName, email, telephone, relation)
      .then(
        ({ contact }) => {
          dispatch(success(contact));
          dispatch(alertActions.success('Contact successfully created!'));
        },
        error => {
          dispatch(failure(error));
          dispatch(alertActions.error('Could not create contact.'));
        }
      );
  };
};

const getContacts = uid => {
  const request = () => ({ type: volunteerConstants.GETCONTACTS_REQUEST });
  const success = contacts => ({
    type: volunteerConstants.GETCONTACTS_SUCCESS,
    contacts
  });
  const failure = error => ({
    type: volunteerConstants.GETCONTACTS_FAILURE,
    error
  });

  return dispatch => {
    dispatch(request());

    volunteerService.getContacts(uid).then(
      ({ contacts }) => dispatch(success(contacts)),
      error => {
        dispatch(failure(error));
      }
    );
  };
};

const removeContact = (uid, id) => {
  const request = () => ({ type: volunteerConstants.REMOVECONTACT_REQUEST });
  const success = contact => ({
    type: volunteerConstants.REMOVECONTACT_SUCCESS,
    contact,
    id
  });
  const failure = error => ({
    type: volunteerConstants.REMOVECONTACT_FAILURE,
    error
  });

  return dispatch => {
    dispatch(request());

    volunteerService.removeContact(uid, id).then(
      () => {
        dispatch(success());
        dispatch(alertActions.success('Contact successfully removed!'));
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error('Could not remove contact.'));
      }
    );
  };
};

const volunteerActions = {
  getAll,
  removeContact,
  addContact,
  getContacts,
  getContributions,
  getHallOfFame,
  getActivity
};

export default volunteerActions;
