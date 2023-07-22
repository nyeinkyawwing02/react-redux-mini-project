import { LTOKEN } from '../constants';

export const setLocalStorageService = (p) => {
  localStorage.setItem(LTOKEN, JSON.stringify(p));
};

export const getLocalStorageService = () => {
  return JSON.parse(localStorage.getItem(LTOKEN));
};

export const removeLocalStorageService = () => {
  localStorage.removeItem(LTOKEN);
};
