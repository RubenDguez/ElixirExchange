import Login from '../../components/Forms/Login';
import auth from '../../utils/auth';

export default function Landing() {
  const isAuthorized = auth.loggedIn();

  if (isAuthorized) return <AuthorizedLandingPage />;
  else return <Login />;
}

const AuthorizedLandingPage = () => {
  return (
    <div>
      <h2>This is the Authorized Landing page</h2>
    </div>
  );
};
