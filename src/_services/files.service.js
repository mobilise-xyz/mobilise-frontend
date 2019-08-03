import axios from 'axios';
import FileSaver from 'file-saver';
import authHeader from '../_helpers/auth-header';
import utils from '../_helpers/utils';

const get = () => {
  const config = {
    headers: authHeader()
  };

  return axios.get(`/files`, config).then(utils.handleResponse);
};

const download = filename => {
  const config = {
    headers: authHeader(),
    responseType: 'blob'
  };

  return axios.get(`/files/${filename}`, config).then(result => {
    console.log(result.headers['content-type']);
    const blob = new Blob([result.data], {
      type: result.headers['content-type']
    });
    console.log(blob);
    FileSaver.saveAs(blob, filename);
  });
};

const filesService = {
  get,
  download
};

export default filesService;
