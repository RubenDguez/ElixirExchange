import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { CiCircleCheck } from 'react-icons/ci';
import { getAllCategories } from '../../../api/categoryAPI';
import { createDrink } from '../../../api/drinkAPI';
import { MyDrinksContext } from '../../../App';
import useAuthenticate from '../../../hooks/authenticate';
import './drinkSubmission.css';

function DrinkSubmission() {
  const drinkNameRef = useRef<HTMLInputElement>(null);
  const drinkDescriptionRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const instructionsRef = useRef<HTMLTextAreaElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);
  const unitRef = useRef<HTMLInputElement>(null);
  const ingredientNameRef = useRef<HTMLInputElement>(null);
  const [ingredients, setIngredients] = useState<Array<IIngredients>>([]);
  const [categories, setCategories] = useState<Array<{ id: number; name: string }>>([]);
  const myDrinksContext = useContext(MyDrinksContext);
  const { getJwt, getDecoded } = useAuthenticate();

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

  const handleCreateDrink = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      const userId = getDecoded(getJwt()!).id;
      const name = drinkNameRef.current?.value || '';
      const description = drinkDescriptionRef.current?.value || '';
      const instructions = instructionsRef.current?.value || '';
      const categoryId = categoryRef.current?.value || '';
      const picture = '';

      const drink = {
        userId,
        categoryId,
        name,
        picture,
        ingredients,
        description,
        instructions,
      };

      try {
        await createDrink(drink, getJwt()!);
        myDrinksContext?.update({ name, description });
      } catch (error) {
        const ERROR = error as Error;
        console.error(ERROR.message);
      }
    },
    [ingredients, myDrinksContext, getJwt, getDecoded],
  );

  useEffect(() => {
    async function fetchCategories() {
      const data = await getAllCategories(getJwt()!);
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
        <label htmlFor="drink-description">Description</label>
        <input ref={drinkDescriptionRef} type="text" id="drink-description" name="drink-description" />
      </div>

      <div className="form-field">
        <label htmlFor="spirit">Select Spirit</label>
        <select ref={categoryRef} id="spirit">
          <option value="">--Select a spirit--</option>
          {categories.length > 0 &&
            categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
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

      <button onClick={(e) => handleCreateDrink(e)}>Submit Drink</button>
    </form>
  );
}

export default DrinkSubmission;
