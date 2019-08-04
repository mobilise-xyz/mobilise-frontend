import filesConstants from '../_constants/files.constants';
import filesService from '../_services/files.service';
import alertActions from './alert.actions';

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
  const request = () => ({ type: filesConstants.UPLOAD_REQUEST });
  const success = res => ({
    type: filesConstants.UPLOAD_SUCCESS,
    res,
    file
  });
  const failure = error => ({
    type: filesConstants.UPLOAD_FAILURE,
    error
  });

  return dispatch => {
    dispatch(request());

    filesService.upload(file).then(
      res => dispatch(success(res)),
      error => {
        dispatch(failure(error));
        dispatch(
          alertActions.error('Something went wrong when uploading file!')
        );
      }
    );
  };
};

const deleteFile = filename => {
  const request = () => ({ type: filesConstants.DELETE_REQUEST });
  const success = res => ({
    type: filesConstants.DELETE_SUCCESS,
    res,
    filename
  });
  const failure = error => ({
    type: filesConstants.DELETE_FAILURE,
    error
  });

  return dispatch => {
    dispatch(request());

    filesService.deleteFile(filename).then(
      res => dispatch(success(res)),
      error => {
        dispatch(failure(error));
        dispatch(
          alertActions.error('Something went wrong when deleting file!')
        );
      }
    );
  };
};

const filesActions = {
  get,
  download,
  upload,
  deleteFile
};

export default filesActions;
