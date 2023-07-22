import axios from 'axios';
import { URL } from '../../config';
import { toast } from 'react-toastify';
import { GETUSERS, LOGIN, LOGOUT } from '../action-types';
import { removeLocalStorageService } from '../../services/LocalStorageService';

export const register = (payload, navigate) => {
  return async () => {
    try {
      await axios.post(`${URL}/users`, payload).then(() => {
        navigate('/signin');
        toast.success('Successfully Registered!');
      });
    } catch (err) {
      toast.error('Registration Failed!');
    }
  };
};

export const getUsers = () => {
  return async (dispatch) => {
    try {
      await axios.get(`${URL}/users`).then((resp) => {
        dispatch({
          type: GETUSERS,
          payload: resp.data,
        });
      });
    } catch (err) {
      console.log('get user error : ', err);
    }
  };
};

export const login = (paylaod, navigate, setToken) => {
  return async (dispatch) => {
    dispatch({
      type: LOGIN,
      payload: paylaod,
    });
    toast.success('Logged in successfully!');

    setToken(paylaod);
    navigate('/');
  };
};

export const logout = (navigate) => {
  return async (dispatch) => {
    dispatch({
      type: LOGOUT,
      payload: null,
    });
    toast.success('Logged out successfully!');

    removeLocalStorageService();
    navigate('/');
  };
};
