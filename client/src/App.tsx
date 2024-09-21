/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import useAuthenticate from './hooks/authenticate';
import { createContext, useEffect, useState } from 'react';

export const DrinkInspirationContext = createContext<IDrinks | null>(null)

function App() {
  const [drinkInspiration, setDrinkInspiration] = useState<IDrinks | null>(null)
  const authenticate = useAuthenticate();

  useEffect(() => {
    async function fetchDrinkInspiration() {
      const response = await fetch('/api/drink-inspiration', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authenticate.getJwt()}`,
        },
      });
      const data: IDrinks = await response.json();
      setDrinkInspiration(data);
    }
    fetchDrinkInspiration();
  }, []);

  return (
    <div className={authenticate.isLoggedIn ? 'authorized-app' : 'not-authorized-app'}>
      <Navbar />
      <main>
        <DrinkInspirationContext.Provider value={drinkInspiration}>
          <Outlet />
        </DrinkInspirationContext.Provider>
      </main>
      <Footer />
    </div>
  )
}

export default App
