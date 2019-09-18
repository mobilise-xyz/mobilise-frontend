import linksConstants from '../_constants/links.constants';
import linksService from '../_services/links.service';
import alertActions from './alert.actions';

const getAll = () => {
  const getSuccess = result => ({
    type: linksConstants.GET,
    links: result.links
  });

  return dispatch => {
    linksService.getAll().then(result => dispatch(getSuccess(result)));
  };
};

const add = link => {
  const request = () => ({ type: linksConstants.ADD_REQUEST });
  const success = res => ({
    type: linksConstants.ADD_SUCCESS,
    link: res.link
  });

  const failure = error => ({
    type: linksConstants.ADD_FAILURE,
    error
  });

  return dispatch => {
    dispatch(request());

    linksService.add(link).then(
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

const remove = id => {
  const request = () => ({ type: linksConstants.REMOVE_REQUEST });
  const success = () => ({
    type: linksConstants.REMOVE_SUCCESS,
    id
  });

  const failure = error => ({
    type: linksConstants.REMOVE_FAILURE,
    error
  });

  return dispatch => {
    dispatch(request());

    linksService.remove(id).then(
      res => {
        dispatch(success(res));
        dispatch(alertActions.success(`Link removed successfully!`));
      },
      error => {
        dispatch(failure(error));
        dispatch(
          alertActions.error('Something went wrong when removing link!')
        );
      }
    );
  };
};

const linksActions = {
  getAll,
  add,
  remove
};

export default linksActions;
