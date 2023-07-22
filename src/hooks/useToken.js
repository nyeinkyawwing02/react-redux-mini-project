import { useState } from 'react';
import {
  getLocalStorageService,
  setLocalStorageService,
} from '../services/LocalStorageService';

const useToken = () => {
  let getToken = () => {
    let userToken = getLocalStorageService();
    return userToken;
  };

  let [token, setToken] = useState(getToken());
  
  let saveToken = (userToken) => {
    setLocalStorageService(userToken);
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token,
  };
};

export default useToken;
