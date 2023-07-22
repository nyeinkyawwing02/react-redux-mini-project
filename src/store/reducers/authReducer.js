import { LOGIN, LOGOUT } from '../action-types';
import { getLocalStorageService } from '../../services/LocalStorageService';

const initialState = {
  authenticatedUser: getLocalStorageService() || null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        authenticatedUser: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        authenticatedUser: action.payload,
      };
    default:
      return state;
  }
};
