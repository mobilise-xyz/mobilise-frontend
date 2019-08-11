import moment from 'moment';
import filesConstants from '../_constants/files.constants';

const files = (state = {}, action) => {
  switch (action.type) {
    case filesConstants.GET: {
      return {
        files: action.files.files
      };
    }
    case filesConstants.UPLOAD_SUCCESS: {
      return {
        files: [
          ...state.files,
          {
            name: action.file.name,
            modified: moment(action.file.lastModified).format(),
            size: action.file.size
          }
        ]
      };
    }
    case filesConstants.DELETE_SUCCESS: {
      const f = state.files.filter(file => {
        return file.name !== action.filename;
      });
      return {
        files: f
      };
    }
    default: {
      return state;
    }
  }
};

export default files;
