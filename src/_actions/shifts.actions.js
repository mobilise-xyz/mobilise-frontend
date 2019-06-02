import shiftsConstants from '../_constants/shifts.constants';
import shiftsService from '../_services/shifts.service';
import alertActions from './alert.actions';

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
        dispatch(alertActions.error('Error getting shifts.'));
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
        dispatch(alertActions.error('Error deleting a shift'));
      }
    );
  };
};

const book = (shiftId, roleName, repeatedType, until) => {
  const request = id => {
    return { type: shiftsConstants.BOOK_REQUEST, id };
  };
  const success = id => {
    return { type: shiftsConstants.BOOK_SUCCESS, id };
  };
  const failure = (id, error) => {
    return { type: shiftsConstants.BOOK_FAILURE, id, error };
  };

  console.log(
    'book id with role action',
    shiftId,
    roleName,
    repeatedType,
    until
  );

  return dispatch => {
    dispatch(request(shiftId));

    shiftsService.book(shiftId, roleName, repeatedType, until).then(
      () => {
        dispatch(success(shiftId));
        dispatch(alertActions.success('Booked successfully!'));
      },
      error => {
        console.log('ERROR', error);
        dispatch(failure(shiftId, error));
        dispatch(
          alertActions.error('Something went wrong with booking this shift!')
        );
      }
    );
  };
};

const shiftsActions = {
  getAll,
  getForUser,
  book,
  deleteWithId
};

export default shiftsActions;
