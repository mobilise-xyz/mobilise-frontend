import moment from 'moment';

const handleResponse = resp => {
  if (resp.status !== 200) {
    return Promise.reject(resp);
  }
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
