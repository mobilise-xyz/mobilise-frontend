import moment from 'moment';

const handleResponse = resp => {
  if (resp.status !== 200 && resp.status !== 201) {
    return Promise.reject(resp);
  }
  return resp.data;
};

const formatTime = time =>
  moment(time, 'H:m:ss')
    .local()
    .format('HH:mm');

const formatDate = date => moment(date).format('LL');

const utils = {
  handleResponse,
  formatTime,
  formatDate
};

export default utils;
