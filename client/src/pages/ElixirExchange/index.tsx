import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import useAuthenticate from '../../hooks/authenticate';
import './elixir.css';

interface IElixir {
  name: string;
  description: string;
  instructions: string;
  category: { id: number; name: string };
  ElixirIngredients: Array<{
    name: string;
    amount: number;
    unit: string;
  }>;
}

export default function ElixirExchange() {
  const { id } = useParams();
  const [elixir, setElixir] = useState<IElixir | null>(null);
  const [error, setError] = useState('');
  const authenticate = useAuthenticate();

  useEffect(() => {
    async function getElixir(id: number) {
      try {
        const response = await fetch(`/drinks/${id}`);
        const data = await response.json();

        if (data.message && data.message === 'Drink not found') {
          throw new Error('Drink not found');
        }

        setElixir(data);
      } catch (error) {
        const ERROR = error as Error;
        setError(ERROR.message);
      }
    }

    getElixir(parseInt(id!));
  }, [id]);

  if (error) {
    return (
      <div className="elixir-error">
        <h1>Really? out of all the drinks in this site, you had to end up here...</h1>
        <h1>{error}</h1>
      </div>
    );
  }

  if (elixir === null) {
    return <div>Loading...</div>;
  }

  return (
    <div style={authenticate.getJwt() !== null ? { color: 'black' } : { backdropFilter: 'blur(60px)', color: 'white' }} className="elixir-exchange">
      <div className="elixir-inner">
        <div className="elixir-header">
          <div className="elixir-subheader">
            <div className="elixir-exchange-logo"></div>
            <h2>Elixir Exchange</h2>
          </div>
          <p>
            Not a member yet? please{' '}
            <Link to="/" style={authenticate.getJwt() !== null ? { color: 'var(--secondary)' } : { color: 'var(--primary)' }}>
              create an account
            </Link>{' '}
            and start sharing some of your best prepared drinks
          </p>
        </div>
        <h2 className="elixir-exchange-title">{elixir.name}</h2>
        <div className="elixir-exchange-description">
          <p>{elixir.description}</p>
          <p>{elixir.category.name}</p>
        </div>
        <h3 className="elixir-exchange-table-header">Ingredients</h3>
        <table className="elixir-exchange-table">
          <thead>
            <tr>
              <th>name</th>
              <th>unit</th>
              <th>amount</th>
            </tr>
          </thead>
          <tbody>
            {elixir.ElixirIngredients.length > 0 &&
              elixir.ElixirIngredients.map((ing) => (
                <tr key={ing.name}>
                  <td>{ing.name}</td>
                  <td>{ing.unit}</td>
                  <td>{ing.amount}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <h3 className="elixir-exchange-table-header">Instructions</h3>
        <p className="elixir-exchange-instructions">{elixir.instructions}</p>
      </div>
    </div>
  );
}
