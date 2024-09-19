import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import useAuthenticate from './hooks/authenticate';

function App() {
  const authenticate = useAuthenticate();

  return (
    <div className={authenticate.isLoggedIn ? 'authorized-app' : 'not-authorized-app'}>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
