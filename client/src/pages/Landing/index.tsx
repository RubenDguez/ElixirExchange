import { useState } from 'react';
import Login from '../../components/Forms/Login';
import SignUp from '../../components/Forms/SignUp';
import auth from '../../utils/auth';
import './landing.css';

const AuthorizedLandingPage = () => {
  return (
    <div>
      <h2>This is the Authorized Landing page</h2>
    </div>
  );
};

const LoginSignUp = ({hasAccount, setHasAccount}: {hasAccount: boolean, setHasAccount: React.Dispatch<React.SetStateAction<boolean>>}) => {
  return (
    <div className='landing'>
    {hasAccount ? (
      <div>
        <SignUp />
        <p>
          Have an account? {' '}
          <span>
            <button onClick={() => setHasAccount(false)}>login</button>
          </span>{' '}
          instead
        </p>
      </div>
    ) : (
      <div>
        <Login />
        <p>
          Don&apos;t have an account?, please{' '}
          <span>
            <button onClick={() => setHasAccount(true)}>Sing Up</button>
          </span>
        </p>
      </div>
    )}
  </div>
  )
}

export default function Landing() {
  const isAuthorized = auth.loggedIn();
  const [hasAccount, setHasAccount] = useState(false);

  if (isAuthorized) return <AuthorizedLandingPage />;
  else return <LoginSignUp hasAccount={hasAccount} setHasAccount={setHasAccount}/>
}
