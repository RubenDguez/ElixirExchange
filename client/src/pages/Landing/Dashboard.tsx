/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import MyDrinks from './MyDrinks/MyDrinks';
import useAuthenticate from '../../hooks/authenticate';
import DrinkInspiration from './DrinkInspiration';

type TActions = null | 'AddCategory' | 'Drinks' | 'DrinkInspire';

const buttons: Array<{ value: TActions; label: string }> = [
  { value: null, label: 'My Drinks' },
  { value: 'AddCategory', label: 'Add Category' },
  { value: 'Drinks', label: 'Drink' },
  { value: 'DrinkInspire', label: 'Drink Inspiration' },
];

export default function Dashboard() {
  const [action, setAction] = useState<TActions | null>(null);
  const [title, setTitle] = useState('');
  const [drinkInspiration, setDrinkInspiration] = useState<IDrinks | null>(null);
  const [myDrinks, setMyDrinks] = useState<Array<{ name: string; description: string }>>([]);

  const { getJwt } = useAuthenticate();

  useEffect(() => {
    setTitle(buttons.find((f) => f.value === action)!.label);
  }, [action]);

  useEffect(() => {
    setAction(null);
  }, []);

  useEffect(() => {
    async function fetchDrinkInspiration() {
      const response = await fetch('/api/drink-inspiration', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getJwt()}`,
        },
      });
      const data: IDrinks = await response.json();
      setDrinkInspiration(data);
    }
    fetchDrinkInspiration();
  }, []);

  useEffect(() => {
    async function getMyDrinks() {
      const response = await fetch('/api/users', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getJwt()}`,
        },
      });
      const json = await response.json();
      const data = await json;
      const myDrinks = data[0]['ElixirDrinks'].map((drink: { name: string; description: string }) => ({ name: drink.name, description: drink.description }));
      setMyDrinks(myDrinks);
    }
    getMyDrinks();
  }, []);

  function AddCategory() {
    return <h3>This is the Add Category form</h3>;
  }

  function DrinkSubmission() {
    return <h3>This is the Drink option</h3>;
  }

  function OperationsWrapper({ title, children }: { title: string; children: React.ReactNode }) {
    return (
      <>
        <h3 className="title">{title}</h3>
        <div className="operations-wrapper">{children}</div>
      </>
    );
  }

  function Operations() {
    switch (action) {
      case 'AddCategory':
        return <AddCategory />;
      case 'Drinks':
        return <DrinkSubmission />;
      case 'DrinkInspire':
        return <DrinkInspiration 
            name={drinkInspiration?.name} 
            category={drinkInspiration?.category}
            drinkThumb={drinkInspiration?.drinkThumb}
            glass={drinkInspiration?.glass}
            ingredients={drinkInspiration?.ingredients}
            instructions={drinkInspiration?.instructions}
          />;
      case null:
      default:
        return <MyDrinks myDrinks={myDrinks} />;
    }
  }

  return (
    <div className="dashboard">
      <p className="drink-of-day">
        Drink inspiration{' '}
        <button onClick={() => setAction('DrinkInspire')} style={{ textTransform: 'uppercase', color: 'white', backgroundColor: 'var(--tertiary)' }}>
          {drinkInspiration?.name}
        </button>
      </p>
      <h2>Dashboard</h2>

      <div className="panel">
        <div className="actions">
          {buttons.map((btn) => (
            <button key={btn.label} className={action === btn.value ? 'active' : ''} onClick={() => setAction(btn.value)}>
              {btn.label}
            </button>
          ))}
        </div>
        <div className="operations">
          <OperationsWrapper title={title}>
            <Operations />
          </OperationsWrapper>
        </div>
      </div>
    </div>
  );
}
