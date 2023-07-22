import { combineReducers } from 'redux';
import authReducer from './authReducer';
import gameReducer from './gameReducer';
import userReducer from './userReducer';

export const reducers = () =>
  combineReducers({
    auth: authReducer,
    games: gameReducer,
    users: userReducer,
  });
