import volunteerConstants from '../_constants/volunteer.constants';
import volunteerService from '../_services/volunteer.service';
import alertActions from './alert.actions';

const getAll = (approved = true) => {
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

    volunteerService.getAll(approved).then(
      ({ volunteers }) => dispatch(success(volunteers)),
      error => {
        dispatch(failure(error));
      }
    );
  };
};

const approve = uid => {
  const request = () => ({ type: volunteerConstants.APPROVE_REQUEST });
  const success = result => ({
    type: volunteerConstants.APPROVE_SUCCESS,
    result,
    uid
  });
  const failure = error => ({
    type: volunteerConstants.APPROVE_FAILURE,
    error
  });

  return dispatch => {
    dispatch(request());

    volunteerService.approve(uid).then(
      ({ result }) => {
        dispatch(success(result));
        dispatch(alertActions.success(`Volunteer successfully approved!`));
      },
      error => {
        dispatch(failure(error));
        dispatch(
          alertActions.success(`Something went wrong approving volunteer!`)
        );
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
  approve,
  getAll,
  getContributions,
  getHallOfFame,
  getActivity
};

export default volunteerActions;
