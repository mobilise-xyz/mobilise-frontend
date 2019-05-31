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

const openModal = () => {
  const open = () => ({ type: shiftConstants.OPEN_MODAL });

  return dispatch => {
    dispatch(open());
  };
};

const closeModal = () => {
  const close = () => ({ type: shiftConstants.CLOSE_MODAL });

  return dispatch => {
    dispatch(close());
  };
};

const shiftActions = {
  openModal,
  closeModal,
  deleteWithId
};

export default shiftActions;
