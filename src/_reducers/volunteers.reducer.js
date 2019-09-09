import volunteerConstants from '../_constants/volunteer.constants';

const volunteers = (state = {}, action) => {
  switch (action.type) {
    case volunteerConstants.CONTRIBUTIONS_REQUEST:
      return {
        ...state,
        contributions: action.contributions,
        contributionsLoading: true
      };
    case volunteerConstants.CONTRIBUTIONS_SUCCESS:
      return {
        ...state,
        contributions: action.contributions,
        contributionsLoading: false
      };
    case volunteerConstants.CONTRIBUTIONS_FAILURE:
      return {
        ...state,
        contributionError: action.error,
        contributionsLoading: false
      };
    case volunteerConstants.HALLOFFAME_REQUEST:
      return {
        ...state,
        hallOfFameLoading: true
      };
    case volunteerConstants.HALLOFFAME_SUCCESS:
      return {
        ...state,
        hallOfFame: action.hallOfFame,
        hallOfFameLoading: false
      };
    case volunteerConstants.HALLOFFAME_FAILURE:
      return {
        ...state,
        hallOfFameError: action.error,
        hallOfFameLoading: false
      };
    case volunteerConstants.ACTIVITY_REQUEST:
      return {
        ...state,
        activityLoading: true
      };
    case volunteerConstants.ACTIVITY_SUCCESS:
      return {
        ...state,
        activity: action.activity,
        activityLoading: false
      };
    case volunteerConstants.ACTIVITY_FAILURE:
      return {
        ...state,
        activityError: action.error,
        activityLoading: false
      };
    case volunteerConstants.GETCONTACTS_SUCCESS:
      return {
        ...state,
        contacts: action.contacts
      };
    case volunteerConstants.ADDCONTACT_SUCCESS:
      return {
        ...state,
        contacts: [...state.contacts, action.contact]
      };
    case volunteerConstants.REMOVECONTACT_SUCCESS:
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.id)
      };
    case volunteerConstants.GETALL_SUCCESS:
      return {
        ...state,
        approved: action.volunteers
      };
    default:
      return state;
  }
};

export default volunteers;
