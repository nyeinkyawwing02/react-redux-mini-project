import { useEffect, useState } from 'react';
import { getLocalStorageService } from '../services/LocalStorageService';

export const useLocalStorage = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (token) {
      setToken(getLocalStorageService);
    }
  }, [token]);

  return [token];
};
