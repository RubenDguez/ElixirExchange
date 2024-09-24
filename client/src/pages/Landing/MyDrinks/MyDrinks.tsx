import './myDrinks.css';

interface IMyDrinks {
  myDrinks: Array<{name: string, description: string}>
}

export default function DrinkList({myDrinks}: Partial<IMyDrinks>) {
  return (
    <div className='my-drinks'>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {
            (myDrinks && myDrinks.length > 0) && myDrinks.map((drink, index) => (
              <tr key={drink.name + index}>
                <td>{drink.name}</td>
                <td>{drink.description}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
