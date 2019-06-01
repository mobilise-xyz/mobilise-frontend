import shiftConstants from '../_constants/shift.constants';
import shiftService from '../_services/shift.service';

const deleteWithId = shiftId => {
  const request = user => {
    return { type: shiftConstants.DELETE_REQUEST, user };
  };
  const success = () => {
    return { type: shiftConstants.DELETE_SUCCESS };
  };
  const failure = error => {
    return { type: shiftConstants.DELETE_FAILURE, error };
  };

  return dispatch => {
    dispatch(request());

    shiftService.deleteWithId(shiftId).then(
      () => dispatch(success()),
      error => {
        dispatch(failure(error));
      }
    );
  };
};

const bookWithIdAndRole = (shiftId, roleName) => {
  const request = user => {
    return { type: shiftConstants.BOOK_REQUEST, user };
  };
  const success = () => {
    return { type: shiftConstants.BOOK_SUCCESS };
  };
  const failure = error => {
    return { type: shiftConstants.BOOK_FAILURE, error };
  };

  return dispatch => {
    dispatch(request());

    shiftService.bookWithIdAndRole(shiftId, roleName).then(
      () => dispatch(success()),
      error => {
        dispatch(failure(error));
      }
    );
  };
};

const shiftActions = {
  deleteWithId,
  bookWithIdAndRole
};

export default shiftActions;
