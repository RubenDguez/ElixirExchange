import { useEffect, useState } from "react";

export default function Dashboard() {
  const [drinkOfTheDay, setDrinkOfTheDay] = useState('Old Fashion');
  const [drinkOwner, setDrinkOwner] = useState('Ruben Dominguez');

  useEffect(() => {
    setDrinkOfTheDay('Old Fashion');
    setDrinkOwner('Ruben Dominguez')
  }, []);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      <div><p>Drink of the day <span>{drinkOfTheDay}</span> by <span>{drinkOwner}</span></p></div>
    </div>
  );
}
