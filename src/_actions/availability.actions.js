import availabilityConstants from '../_constants/availability.constants';
import availabilityService from '../_services/availability.service';
import alertActions from './alert.actions';

const get = uid => {
  const getSuccess = availability => ({
    type: availabilityConstants.GET,
    availability
  });

  return dispatch => {
    availabilityService
      .get(uid)
      .then(availability => dispatch(getSuccess(availability)));
  };
};

const update = (uid, availability) => {
  const updateSuccess = () => ({
    type: availabilityConstants.UPDATE
  });

  return dispatch => {
    availabilityService.update(uid, availability).then(() => {
      dispatch(alertActions.success('Availability successfully updated.'));
      return dispatch(updateSuccess());
    });
  };
};

const available = (time, day) => ({
  type: availabilityConstants.AVAILABLE,
  time,
  day
});

const maybe = (time, day) => ({
  type: availabilityConstants.MAYBE,
  time,
  day
});

const unavailable = (time, day) => ({
  type: availabilityConstants.UNAVAILABLE,
  time,
  day
});

const availabilityActions = {
  available,
  maybe,
  unavailable,
  get,
  update
};

export default availabilityActions;
