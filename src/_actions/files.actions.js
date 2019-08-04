import filesConstants from '../_constants/files.constants';
import filesService from '../_services/files.service';

const get = () => {
  const getSuccess = files => ({
    type: filesConstants.GET,
    files
  });

  return dispatch => {
    filesService.get().then(files => dispatch(getSuccess(files)));
  };
};

const download = filename => {
  const downloadSuccess = res => ({
    type: filesConstants.DOWNLOAD,
    res
  });

  return dispatch => {
    filesService.download(filename).then(res => dispatch(downloadSuccess(res)));
  };
};

const upload = file => {
  const uploadSuccess = res => ({
    type: filesConstants.UPLOAD,
    res
  });

  return dispatch => {
    filesService.upload(file).then(res => dispatch(uploadSuccess(res)));
  };
};

const filesActions = {
  get,
  download,
  upload
};

export default filesActions;
