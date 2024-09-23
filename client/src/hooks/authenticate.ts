import { JwtPayload, jwtDecode } from 'jwt-decode';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface userInformation {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
}

export default function useAuthenticate() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<JwtPayload | null>(null);
  const [jwt, setJWT] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isExpired, setIsExpired] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const login = useCallback(
    (token: string) => {
      localStorage.setItem('id_token', token);
      navigate(0);
    },
    [navigate],
  );

  const logout = useCallback(() => {
    localStorage.removeItem('id_token');
  }, []);

  const getDecoded = (jwt: string): JwtPayload & userInformation => {
    const decoded = jwtDecode<JwtPayload & userInformation>(jwt);
    return {
      dob: decoded.dob,
      email: decoded.email,
      exp: decoded.exp,
      firstName: decoded.firstName,
      iat: decoded.iat,
      id: decoded.id,
      lastName: decoded.lastName,
      username: decoded.username,
    };
  };

  const getJwt = () => {
    return localStorage.getItem('id_token');
  };

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

  return { jwt, profile, isAuthorized, isExpired, isLoggedIn, login, logout, getJwt, getDecoded };
}
