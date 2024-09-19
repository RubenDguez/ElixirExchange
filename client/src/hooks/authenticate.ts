import { JwtPayload, jwtDecode } from 'jwt-decode';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useAuthenticate() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<JwtPayload | null>(null);
  const [jwt, setJWT] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isExpired, setIsExpired] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const login = useCallback((token: string) => {
    localStorage.setItem('id_token', token);
    navigate(0);
  }, [navigate]);

  const logout = useCallback(() => {
    localStorage.removeItem('id_token');
  }, []);

  useEffect(() => {
    setJWT(() => {
      return localStorage.getItem('id_token') || '';
    });
  }, []);

  useEffect(() => {
    setProfile(() => {
      if (!jwt) return null;
      return jwtDecode<JwtPayload>(jwt);
    });
  }, [jwt]);

  useEffect(() => {
    setIsExpired(() => {
      if (jwt === '') return false;

      const decodedToken = jwtDecode<JwtPayload>(jwt);
      const currentTime = Date.now() / 1000;

      if (!decodedToken.exp) return false;
      return decodedToken.exp < currentTime;
    });

    setIsLoggedIn(() => profile !== null);
    setIsAuthorized(() => isLoggedIn && !isExpired);
  }, [jwt, profile, isLoggedIn, isExpired]);

  return { profile, isAuthorized, isExpired, isLoggedIn, login, logout };
}
