import metricConstants from '../_constants/metric.constants';
import metricService from '../_services/metric.service';
import alertActions from './alert.actions';

const get = () => {
  const getSuccess = metric => ({
    type: metricConstants.GET,
    metric
  });

  return dispatch => {
    metricService.get().then(metric => dispatch(getSuccess(metric)));
  };
};

const update = (name, verb, value) => {
  const request = () => ({ type: metricConstants.UPDATE_REQUEST });

  const success = res => ({
    type: metricConstants.UPDATE_SUCCESS,
    res
  });

  const failure = error => ({
    type: metricConstants.UPDATE_FAILURE,
    error
  });

  return dispatch => {
    dispatch(request());

    metricService.update(name, verb, value).then(
      res => {
        dispatch(success(res));
        dispatch(alertActions.success('Metric successfully updated!'));
      },
      error => {
        dispatch(failure(error));
        dispatch(
          alertActions.error('Something went wrong when updating metric!')
        );
      }
    );
  };
};

const metricActions = {
  get,
  update
};

export default metricActions;
