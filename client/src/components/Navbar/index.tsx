import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuthenticate from '../../hooks/authenticate';
import './navbar.css';

const defaultLinks = [
  { label: 'Home', to: '/' },
  { label: 'Contact', to: '/contact' },
  { label: 'About', to: '/about' },
];

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const authenticate = useAuthenticate();

  const checkLogin = useCallback(() => {
    if (authenticate.isLoggedIn) setLoginCheck(true);
    else setLoginCheck(false);
  }, [authenticate]);

  const handleLogout = useCallback(() => {
    authenticate.logout();
    checkLogin();
    navigate('/');
    navigate(0);
  }, [navigate, authenticate, checkLogin]);

  useEffect(() => {
    checkLogin();
  }, [loginCheck, checkLogin]);

  return (
    <nav>
      <div className={loginCheck ? 'nav-app-name nav-app-black' : 'nav-app-name nav-app-white'}>
        <h1 onClick={() => navigate('/')}>Elixir Exchange</h1>
      </div>
      <ul className="nav-links">
        {defaultLinks.map((link) => (
          <li key={link.label}>
            <button type="button" className={pathname === link.to ? 'nav-active-button' : ''} onClick={() => navigate(link.to)}>
              {link.label}
            </button>
          </li>
        ))}

        {loginCheck && (
          <>
            <li>
              <button type="button" onClick={() => navigate('/drinkSubmission')}>
                Add Drink
              </button>
            </li>
            <li>
              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
