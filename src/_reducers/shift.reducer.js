import shiftConstants from '../_constants/shift.constants';

const shift = (state = {}, action) => {
  switch (action.type) {
    // DELETE
    case shiftConstants.DELETE_REQUEST:
      return {
        loading: true
      };
    case shiftConstants.DELETE_SUCCESS:
      console.log('DELETE SUCCESS');
      return {
        deleteSuccess: true
      };
    case shiftConstants.DELETE_FAILURE:
      return {
        deleteSuccess: false,
        error: action.error
      };

    case shiftConstants.BOOK_REQUEST:
      return {
        loading: true
      };
    case shiftConstants.BOOK_SUCCESS:
      return {
        bookSuccess: true
      };
    case shiftConstants.BOOK_FAILURE:
      return {
        bookSuccess: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default shift;
