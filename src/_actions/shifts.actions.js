import shiftsConstants from '../_constants/shifts.constants';
import shiftsService from '../_services/shifts.service';

const getAll = () => {
  const request = () => ({ type: shiftsConstants.GETALL_REQUEST });
  const success = shifts => ({ type: shiftsConstants.GETALL_SUCCESS, shifts });
  const failure = error => ({ type: shiftsConstants.GETALL_FAILURE, error });

  return dispatch => {
    dispatch(request());

    shiftsService.getAll().then(
      shifts => dispatch(success(shifts)),
      error => {
        dispatch(failure(error));
      }
    );
  };
};

// Gets shifts + recommended shifts for the specified user.
const getForUser = uid => {
  const request = () => ({ type: shiftsConstants.GETFORUSER_REQUEST });
  const success = shifts => ({
    type: shiftsConstants.GETFORUSER_SUCCESS,
    shifts
  });
  const failure = error => ({
    type: shiftsConstants.GETFORUSER_FAILURE,
    error
  });

  return dispatch => {
    dispatch(request());

    shiftsService.getForUser(uid).then(
      shifts => dispatch(success(shifts)),
      error => {
        dispatch(failure(error));
      }
    );
  };
};

const shiftsActions = {
  getAll,
  getForUser
};

export default shiftsActions;
