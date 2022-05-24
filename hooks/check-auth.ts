import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { useSelector } from '../store/store-config';

export const useCheckAuth = () => {
  const isAuthenticated = !!useSelector((s) => s.auth.token);
  const networkStatus = useSelector((state) => state.app.networkStatus);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated || networkStatus === 'offline') {
      navigate('/home');
    } else {
      navigate('/');
    }
  }, [isAuthenticated, networkStatus]);
  return { isAuthenticated };
};
