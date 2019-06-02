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

const deleteWithId = shiftId => {
  const request = id => {
    return { type: shiftsConstants.DELETE_REQUEST, id };
  };
  const success = id => {
    return { type: shiftsConstants.DELETE_SUCCESS, id };
  };
  const failure = (id, error) => {
    return { type: shiftsConstants.DELETE_FAILURE, id, error };
  };

  return dispatch => {
    dispatch(request(shiftId));

    shiftsService.deleteWithId(shiftId).then(
      () => dispatch(success(shiftId)),
      error => {
        dispatch(failure(shiftId, error));
      }
    );
  };
};

const bookWithIdAndRole = (shiftId, roleName) => {
  const request = id => {
    return { type: shiftsConstants.BOOK_REQUEST, id };
  };
  const success = id => {
    return { type: shiftsConstants.BOOK_SUCCESS, id };
  };
  const failure = (id, error) => {
    return { type: shiftsConstants.BOOK_FAILURE, id, error };
  };

  console.log('book id with role action', shiftId, roleName);

  return dispatch => {
    dispatch(request(shiftId));

    shiftsService.bookWithIdAndRole(shiftId, roleName).then(
      () => dispatch(success(shiftId)),
      error => {
        dispatch(failure(shiftId, error));
      }
    );
  };
};

const shiftsActions = {
  getAll,
  getForUser,
  bookWithIdAndRole,
  deleteWithId
};

export default shiftsActions;
