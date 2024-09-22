/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import useAuthenticate from './hooks/authenticate';
import { createContext, useEffect, useState } from 'react';

export const DrinkInspirationContext = createContext<IDrinks | null>(null);
export const MyDrinksContext = createContext<{myDrinks: Array<{ name: string; description: string }>, setMyDrinks: React.Dispatch<React.SetStateAction<{name: string; description: string;}[]>>} | null>(null);
export const AuthenticateContext = createContext<typeof useAuthenticate | null>(null);

function App() {
  const [drinkInspiration, setDrinkInspiration] = useState<IDrinks | null>(null);
  const [myDrinks, setMyDrinks] = useState<Array<{ name: string; description: string }>>([]);
  const authenticate = useAuthenticate();

  useEffect(() => {
    async function getMyDrinks() {
      const response = await fetch('/api/users', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authenticate.getJwt()}`,
        },
      });
      const json = await response.json();
      const data = await json;
      const myDrinks = data[0]['ElixirDrinks'].map((drink: { name: string; description: string }) => ({ name: drink.name, description: drink.description }));
      setMyDrinks(myDrinks);
    }
    getMyDrinks();
  }, []);

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
        <MyDrinksContext.Provider value={{myDrinks, setMyDrinks}}>
          <DrinkInspirationContext.Provider value={drinkInspiration}>
            <Outlet />
          </DrinkInspirationContext.Provider>
        </MyDrinksContext.Provider>
      </main>
      <Footer />
    </div>
  );
}

export default App;
