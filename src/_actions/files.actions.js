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

const filesActions = {
  get
};

export default filesActions;
