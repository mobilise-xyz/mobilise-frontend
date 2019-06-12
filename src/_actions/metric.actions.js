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
  const updateSuccess = () => ({
    type: metricConstants.UPDATE
  });

  return dispatch => {
    metricService.update(name, verb, value).then(() => {
      dispatch(alertActions.success('Metric successfully updated.'));
      return dispatch(updateSuccess());
    });
  };
};

const metricActions = {
  get,
  update
};

export default metricActions;
