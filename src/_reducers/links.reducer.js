import linksConstants from '../_constants/links.constants';

const links = (state = {}, action) => {
  switch (action.type) {
    case linksConstants.GET: {
      return {
        links: action.links
      };
    }
    case linksConstants.ADD_SUCCESS: {
      return {
        links: [...state.links, action.link]
      };
    }
    case linksConstants.REMOVE_SUCCESS: {
      const f = state.links.filter(link => {
        return link.id !== action.id;
      });
      return {
        links: f
      };
    }
    default: {
      return state;
    }
  }
};

export default links;
