/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import DrinkList from './MyDrinks/MyDrinks';
import DrinkInspiration from './DrinkInspiration';
import AddCategoryForm from './AddCategoryForm';
import { DrinkInspirationContext, MyDrinksContext } from '../../App';
import DrinkSubmission from '../../components/Forms/DrinkSubmission/drinkSubmission';

type TActions = null | 'AddCategory' | 'AddDrink' | 'DrinkInspire' | 'MyDrinks' | 'AllDrinks';

const buttons: Array<{ value: TActions; label: string }> = [
  { value: null, label: 'Drink Inspiration' },
  { value: 'AddDrink', label: 'Add Drink' },
  { value: 'MyDrinks', label: 'My Drinks' },
  { value: 'AllDrinks', label: 'All Drinks' },
  { value: 'AddCategory', label: 'Add Category' },

];

export default function Dashboard() {
  const [action, setAction] = useState<TActions | null>(null);
  const [title, setTitle] = useState('');
  const drinkInspiration = useContext(DrinkInspirationContext);
  const myDrinks = useContext(MyDrinksContext);

  useEffect(() => {
    setTitle(buttons.find((f) => f.value === action)!.label);
  }, [action]);

  useEffect(() => {
    setAction(null);
  }, []);

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
        return <AddCategoryForm />;
      case 'AddDrink': 
        return <DrinkSubmission /> 
      case 'MyDrinks':
        return <DrinkList myDrinks={myDrinks?.myDrinks} />;
      case 'AllDrinks':
        return <DrinkList myDrinks={myDrinks?.myDrinks} />;
      case null:
      default:
        return <DrinkInspiration 
        name={drinkInspiration?.name} 
        category={drinkInspiration?.category}
        drinkThumb={drinkInspiration?.drinkThumb}
        glass={drinkInspiration?.glass}
        ingredients={drinkInspiration?.ingredients}
        instructions={drinkInspiration?.instructions}
      />;
        
    }
  }

  return (
    <div className="dashboard">
      <p className="drink-of-day">
        Drink inspiration{' '}
        <button onClick={() => setAction(null)} style={{ textTransform: 'uppercase', color: 'black', backgroundColor: 'var(--secondary)' }}>
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
