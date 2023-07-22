import { GETUSERS } from '../action-types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GETUSERS:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};
