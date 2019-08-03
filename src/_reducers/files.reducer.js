import filesConstants from '../_constants/files.constants';

const files = (state = {}, action) => {
  switch (action.type) {
    case filesConstants.GET: {
      return {
        files: action.files.files
      };
    }
    default: {
      return state;
    }
  }
};

export default files;
