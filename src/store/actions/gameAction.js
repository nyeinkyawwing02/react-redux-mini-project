import axios from 'axios';
import { URL } from '../../config';
import { toast } from 'react-toastify';
import { DELETE_GAME, GETGAME } from '../action-types';

export const getGames = (signal) => {
  return async (dispatch) => {
    try {
      await axios.get(`${URL}/games`, { signal }).then((resp) => {
        dispatch({
          type: GETGAME,
          payload: resp.data,
        });
      });
    } catch (err) {
        toast.error('Failed to load games!');
    }
  };
};

export const addGame = (payload, navigate) => {
  return async (dispatch) => {
    try {
      await axios.post(`${URL}/games`, payload)
        .then(() => {
          axios.get(`${URL}/games`)
            .then((data) => {
              dispatch({
                type: GETGAME,
                payload: data.data,
              });
            });
        });

      toast.success('Game has been added successfully!');
      navigate('/');
    } catch (err) {
        toast.error('Failed to add game!');
    }
  };
};

export const updateGame = (payload, navigate) => {
  return async (dispatch) => {
    try {
      await axios.put(`${URL}/games/${payload.id}`, payload)
        .then(() => {
          axios.get(`${URL}/games`)
            .then((data) => {
              dispatch({
                type: GETGAME,
                payload: data.data,
              });
            });
        });

      toast.success('Game has been updated successfully!');
      navigate('/');
    } catch (err) {
        toast.error('Failed to update game!');
    }
  };
};


export const deleteGame = (payload) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${URL}/games/${payload.id}`).then(() => {
        toast.success('Game has been removed successfully!');
        dispatch({
          type: DELETE_GAME,
          payload: payload,
        });
      });
    } catch (err) {
        toast.error('Failed to remove game!');
    }
  };
};
