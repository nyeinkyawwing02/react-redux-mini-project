import { DELETE_GAME, GETGAME } from '../action-types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GETGAME:
      return {
        ...state,
        games: action.payload,
      };
    case DELETE_GAME:
      var newGames = state.games.filter((game) => {
        return game.id != action.payload.id;
      });

      return {
        ...state,
        games: newGames
      };
    default:
      return state;
  }
};
