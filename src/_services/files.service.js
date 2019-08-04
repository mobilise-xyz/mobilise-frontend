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
    const blob = new Blob([result.data], {
      type: result.headers['content-type']
    });
    FileSaver.saveAs(blob, filename);
  });
};

const upload = file => {
  const header = authHeader();
  header['content-type'] = 'multipart/form-data';
  const config = {
    headers: header
  };
  console.log(file);
  const formData = new FormData();
  formData.append('file', file);
  return axios.post(`/files`, formData, config).then(utils.handleResponse);
};

const filesService = {
  get,
  download,
  upload
};

export default filesService;
