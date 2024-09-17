import { AnimatePresence } from 'framer-motion';
import * as motion from 'framer-motion/client';
import { useState } from 'react';
import Login from '../../components/Forms/Login';
import SignUp from '../../components/Forms/SignUp';
import auth from '../../utils/auth';
import './landing.css';
import Terms from '../../components/Terms';

const AuthorizedLandingPage = () => {
  return (
    <div>
      <h2>This is the Authorized Landing page</h2>
    </div>
  );
};

const LoginSignUp = ({ hasAccount, setHasAccount }: { hasAccount: boolean; setHasAccount: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [openTerms, setOpenTerms] = useState(false);
  return (
    <div className="landing" style={{ overflow: 'hidden' }}>
      {hasAccount ? (
        <AnimatePresence>
          <motion.div key="signup" initial={{ opacity: 1, x: '-100%' }} animate={{ opacity: 1, x: 0 }} transition={{ ease: 'easeInOut' }} exit={{ opacity: 1 }}>
            <SignUp toggleTerms={setOpenTerms} />
            <motion.dialog open={openTerms} style={{ position: 'absolute', top: '0px', borderRadius: '4px' }}>
              <Terms toggleTerms={setOpenTerms}/>
            </motion.dialog>
            <motion.p key="have-an-account" initial={{ opacity: 1, x: '-100%' }} animate={{ opacity: 1, x: 0 }} transition={{ ease: 'easeInOut' }} exit={{ opacity: 1 }}>
              Have an account?{' '}
              <span>
                <button onClick={() => setHasAccount(false)}>login</button>
              </span>{' '}
              instead
            </motion.p>
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div key="login" initial={{ opacity: 1, x: '100%' }} animate={{ opacity: 1, x: 0 }} transition={{ ease: 'easeInOut' }} exit={{ opacity: 1 }}>
          <Login />
          <motion.p key="do-not-have-an-account" initial={{ opacity: 1, x: '100%' }} animate={{ opacity: 1, x: 0 }} transition={{ ease: 'easeInOut' }} exit={{ opacity: 1 }}>
            Don&apos;t have an account?, please{' '}
            <span>
              <button onClick={() => setHasAccount(true)}>Sing Up</button>
            </span>
          </motion.p>
        </motion.div>
      )}
    </div>
  );
};

export default function Landing() {
  const isAuthorized = auth.loggedIn();
  const [hasAccount, setHasAccount] = useState(false);
  return <AnimatePresence initial={false}>{isAuthorized ? <AuthorizedLandingPage /> : <LoginSignUp hasAccount={hasAccount} setHasAccount={setHasAccount} />}</AnimatePresence>;
}
