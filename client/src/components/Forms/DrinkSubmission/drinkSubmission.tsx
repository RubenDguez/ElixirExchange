import { useCallback, useEffect, useRef, useState } from 'react';
import { CiCircleCheck } from 'react-icons/ci';
import './drinkSubmission.css';
import useAuthenticate from '../../../hooks/authenticate';

interface IIngredients {
  quantity: number;
  units: string;
  name: string;
}

function DrinkSubmission() {
  const drinkNameRef = useRef<HTMLInputElement>(null);
  const instructionsRef = useRef<HTMLTextAreaElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);
  const unitRef = useRef<HTMLInputElement>(null);
  const ingredientNameRef = useRef<HTMLInputElement>(null);
  const [ingredients, setIngredients] = useState<Array<IIngredients>>([]);
  const [categories, setCategories] = useState<Array<{ id: number; name: string }>>([]);

  const { getJwt } = useAuthenticate();

  // Add ingredient to the list
  const handleAddIngredient = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();

    const quantity: number = parseFloat(quantityRef.current?.value || '0');
    const units: string = unitRef.current?.value || '';
    const name: string = ingredientNameRef.current?.value || '';

    if (!name || quantity <= 0 || !units) {
      alert('Please fill all ingredient fields.');
      return;
    }

    const ing: IIngredients = { quantity, units, name };

    setIngredients((prev) => [...prev, ing]);

    quantityRef.current!.value = '';
    unitRef.current!.value = '';
    ingredientNameRef.current!.value = '';
    quantityRef.current!.focus();

  }, []);

  const handleCreateDrink = useCallback(() => {
    const drinkName = drinkNameRef.current?.value || '';
    const instructions = instructionsRef.current?.value || '';
    const theDrink = {
      name: drinkName,
      category: '',
      ingredients,
      instructions,
    };

    console.log(theDrink);
  }, [ingredients]);

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch('/api/categories', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getJwt()}`,
        },
      });

      const data: Array<{ id: number; name: string }> = await response.json();
      setCategories(data);
    }

    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form className="drink-submission">
      <div className="form-field">
        <label htmlFor="drink-name">Drink Name</label>
        <input ref={drinkNameRef} type="text" id="drink-name" name="drink-name" />
      </div>

      <div className="form-field">
        <label htmlFor="spirit">Select Spirit</label>
        <select id="spirit">
          <option value="">--Select a spirit--</option>
          {
            (categories.length > 0) && categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))
          }
        </select>
      </div>

      <div className="ingredients-section">
        <h3>Ingredients</h3>
        <div className="ingredient-list">
          <table>
            <thead>
              <tr>
                <th>
                  <div className="form-field">
                    <label htmlFor="quantity">Quantity</label>
                    <input ref={quantityRef} type="text" id="quantity" name="quantity" placeholder="Quantity" />
                  </div>
                </th>
                <th>
                  <div className="form-field">
                    <label htmlFor="unit">Units</label>
                    <input ref={unitRef} type="text" id="unit" name="unit" placeholder="Unit (e.g., oz, dashes, pieces)" />
                  </div>
                </th>
                <th>
                  <div className="form-field">
                    <label htmlFor="ingredient-name">Ingredient Name</label>
                    <input ref={ingredientNameRef} type="text" id="ingredient-name" name="ingredient-name" placeholder="Ingredient Name" />
                  </div>
                </th>
                <th>
                  <div className="form-field-action">
                    <div className="form-action" onClick={handleAddIngredient}>
                      <CiCircleCheck style={{ fontSize: '2rem', cursor: 'pointer', color: 'green', marginTop: '1.5rem' }} />
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {ingredients.map((ingredient, index) => (
                <tr key={`${ingredient.name}-${index}`}>
                  <td>{ingredient.quantity}</td>
                  <td>{ingredient.units}</td>
                  <td>{ingredient.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="instructions-form-field">
        <label htmlFor="instructions">Instructions</label>
        <textarea ref={instructionsRef} id="instructions" name="instructions" rows={8} />
      </div>

      <button onClick={handleCreateDrink}>Submit Drink</button>
    </form>
  );
}

export default DrinkSubmission;
