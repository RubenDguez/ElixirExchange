import React, { useEffect, useState } from 'react';

type TActions = null | 'AddCategory' | 'Drinks' | 'DrinkInspire';

const buttons: Array<{ value: TActions; label: string }> = [
  { value: null, label: 'Home' },
  { value: 'AddCategory', label: 'Add Category' },
  { value: 'Drinks', label: 'Drink' },
  { value: 'DrinkInspire', label: 'Drink Inspiration' },
];

export default function Dashboard() {
  const [action, setAction] = useState<TActions | null>(null);
  const [title, setTitle] = useState('');
  const [drinkOfTheDay, setDrinkOfTheDay] = useState('');
  const [drinkInformation, setDrinkInformation] = useState<Array<string>>(['']);
  const [drinkImg, setDrinkImg] = useState<string | undefined>('');

  useEffect(() => {
    setTitle(buttons.find((f) => f.value === action)!.label);
  }, [action]);

  useEffect(() => {
    setAction(null);
  }, []);

  useEffect(() => {
    async function getDrinkOfDay() {
      const response = await fetch('/api/drink-of-day');
      const data = await response.json();

      const drinkName = data['drinks'][0]['strDrink'];

      setDrinkOfTheDay(drinkName);

      const currDrink = Object.keys(data['drinks'][0])
        .map((att) => `${att}: ${data['drinks'][0][att]}`)
        .filter(
          (f) =>
            !f.includes('null') &&
            !f.includes('strDrink') &&
            !f.includes('strImageSource') &&
            !f.includes('ImageAttribution') &&
            !f.includes('idDrink') &&
            !f.includes('dateModified') &&
            !f.includes('InstructionsIT') &&
            !f.includes('InstructionsDE') &&
            !f.includes('InstructionsES') &&
            !f.includes('InstructionsFR') &&
            !f.includes('Alcoholic') &&
            !f.includes('CreativeCommonsConfirmed'),
        ) || [''];

      const drinkImg = Object.keys(data['drinks'][0])
        .map((att) => `${att}: ${data['drinks'][0][att]}`)
        .find((f) => f.includes('strDrinkThumb'));

      setDrinkImg(drinkImg);
      setDrinkInformation(currDrink);
    }

    getDrinkOfDay();
  }, []);

  function Default() {
    return <h3>This is the default</h3>;
  }

  function AddCategory() {
    return <h3>This is the Add Category form</h3>;
  }

  function DrinkSubmission() {
    return <h3>This is the Drink option</h3>;
  }

  function DrinkInspiration() {
    return (
      <div>
        <h3>{drinkOfTheDay}</h3>
        <ul style={{ padding: '0px 2rem', listStyle: 'disk' }}>
          {drinkInformation!.length > 0 &&
            drinkInformation.map((drink) => (
              <li key={drink}>
                {<p>{drink.substring(3, drink.length)}</p>}
              </li>
            ))}
            {
              (drinkImg !== undefined) && <li><img width={300} height={300} src={drinkImg.split('strDrinkThumb: ')[1].trim()} /></li>
            }
        </ul>
      </div>
    );
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
        return <DrinkInspiration />;
      case null:
      default:
        return <Default />;
    }
  }

  return (
    <div className="dashboard">
      <p className="drink-of-day">
        Drink inspiration <button onClick={() => setAction('DrinkInspire')} style={{ textTransform: 'uppercase', color: 'white', backgroundColor: 'var(--tertiary)' }}>{drinkOfTheDay}</button>
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
