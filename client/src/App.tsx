import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import auth from './utils/auth';

function App() {
  const isLoggedIn = auth.loggedIn();

  return (
    <div className={isLoggedIn ? 'authorized-app' : 'not-authorized-app'}>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
