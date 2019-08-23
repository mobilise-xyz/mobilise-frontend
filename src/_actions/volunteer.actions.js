import volunteerConstants from '../_constants/volunteer.constants';
import volunteerService from '../_services/volunteer.service';
import alertActions from './alert.actions';

const getAll = (approved = true, sortBy) => {
  const request = () => ({ type: volunteerConstants.GETALL_REQUEST });
  const success = volunteers => ({
    type: volunteerConstants.GETALL_SUCCESS,
    volunteers,
    approved
  });
  const failure = error => ({
    type: volunteerConstants.GETALL_FAILURE,
    error
  });

  return dispatch => {
    dispatch(request());

    volunteerService.getAll(approved, sortBy).then(
      ({ volunteers }) => dispatch(success(volunteers)),
      error => {
        dispatch(failure(error));
      }
    );
  };
};

const invite = email => {
  const request = () => ({ type: volunteerConstants.INVITE_REQUEST });
  const success = result => ({
    type: volunteerConstants.INVITE_SUCCESS,
    result
  });
  const failure = error => ({
    type: volunteerConstants.INVITE_FAILURE,
    error
  });

  return dispatch => {
    dispatch(request());

    volunteerService.invite(email).then(
      ({ contributions }) => {
        dispatch(success(contributions));
        dispatch(alertActions.success('Successfully invited volunteer!'));
      },
      error => {
        dispatch(failure(error));
        dispatch(alertActions.error('Problem inviting volunteer!'));
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

const volunteerActions = {
  invite,
  getAll,
  getContributions,
  getHallOfFame,
  getActivity
};

export default volunteerActions;
