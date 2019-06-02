import alertConstants from '../_constants/alert.constants';

const success = message => ({
  type: alertConstants.SUCCESS,
  message
});

const error = message => ({
  type: alertConstants.ERROR,
  message
});

const clear = message => ({
  type: alertConstants.CLEAR,
  message
});

const alertActions = {
  success,
  error,
  clear
};

export default alertActions;
