import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import useAuthenticate from '../../hooks/authenticate';
import Dashboard from './Dashboard';
import LoginSignUp from './LoginSignup';

import { useNavigate } from 'react-router-dom';
import './landing.css';

export default function Landing() {
  const navigate = useNavigate();
  const authentication = useAuthenticate();

  useEffect(() => {
    if (authentication.isLoggedIn && authentication.isExpired) {
      authentication.logout();
      navigate(0);
    }
  });

  const [hasAccount, setHasAccount] = useState(false);
  return <AnimatePresence initial={false}>{authentication.isAuthorized ? <Dashboard /> : <LoginSignUp hasAccount={hasAccount} setHasAccount={setHasAccount} />}</AnimatePresence>;
}
