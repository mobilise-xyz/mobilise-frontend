import moment from 'moment';

const handleResponse = resp => {
  return resp.data;
};

const formatTime = time =>
  moment(time, 'H:m:ss')
    .local()
    .format('HH:mm');

const utils = {
  handleResponse,
  formatTime
};

export default utils;
