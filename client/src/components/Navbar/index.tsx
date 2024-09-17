import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../../utils/auth';
import './navbar.css';

const defaultLinks = [
  {label: 'Contact', to: '/contact'},
  {label: 'About', to: '/about'},
]

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);
  const navigate = useNavigate();

  const checkLogin = () => {
    if (auth.loggedIn()) setLoginCheck(true);
    else setLoginCheck(false);
  };

  const handleLogout = useCallback(() => {
    auth.logout();
    checkLogin();
    navigate('/');
    navigate(0);
    
  }, [navigate]);

  useEffect(() => {
    checkLogin();
  }, [loginCheck]);

  return (
    <nav>
      <div className={loginCheck ? 'nav-app-name nav-app-black' : 'nav-app-name nav-app-white'}>
        <h1 onClick={() => navigate('/')}>Elixir Exchange</h1>
      </div>
      <ul className='nav-links'>
        {
          defaultLinks.map((link) => (
            <li key={link.label}>
              <button type='button' onClick={() => navigate(link.to)}>{link.label}</button>
            </li>
          ))
        }
        {loginCheck && (
          <li>
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
