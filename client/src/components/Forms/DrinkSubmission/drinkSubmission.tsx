import { useCallback, useRef, useState } from 'react';
import './drinkSubmission.css';

interface IIngredients {
  quantity: number;
  units: string;
  name: string;
}

function DrinkSubmission() {
  const formRef = useRef<HTMLFormElement>(null);

  const drinkNameRef = useRef<HTMLInputElement>(null);
  const instructionsRef = useRef<HTMLTextAreaElement>(null);
  const spiritQuantityRef = useRef<HTMLInputElement>(null);
  const [selectedSpirit, setSelectedSpirit] = useState<string>('');

  const quantityRef = useRef<HTMLInputElement>(null);
  const unitRef = useRef<HTMLInputElement>(null);
  const ingredientNameRef = useRef<HTMLInputElement>(null);
  const [ingredients, setIngredients] = useState<Array<IIngredients>>([]);
  const [spiritDetails, setSpiritDetails] = useState<IIngredients | null>(null);

  // Add ingredient to the list
  const handleAddIngredient = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const quantity: number = parseFloat(quantityRef.current?.value || '0');
    const units: string = unitRef.current?.value || '';
    const name: string = ingredientNameRef.current?.value || '';

    if (!name || quantity <= 0 || !units) {
      alert("Please fill all ingredient fields.");
      return;
    }

    const ing: IIngredients = { quantity, units, name };

    setIngredients((prev) => [...prev, ing]);

    formRef.current?.reset();
  }, []);

  // Add selected spirit with ounces
  const handleAddSpirit = useCallback(() => {
    const quantity: number = parseFloat(spiritQuantityRef.current?.value || '0');
    const spiritName: string = selectedSpirit;
    const spiritIngredient: IIngredients = { quantity, units: 'oz', name: spiritName };

    setSpiritDetails(spiritIngredient);
  }, [selectedSpirit]);

  const handleCreateDrink = useCallback(() => {
    const drinkName = drinkNameRef.current?.value || '';
    const instructions = instructionsRef.current?.value || '';
    const theDrink = {
      name: drinkName,
      category: spiritDetails,
      ingredients,
      instructions
    };

    console.log(theDrink);
  }, [ingredients, spiritDetails]);

  return (
    <div className="drink-submission">
      <div className="form-container">
        {/* Spirit Category Section */}
        <div className="category-section">
          <div className="form-field">
            <label htmlFor="name">Drink Name</label>
            <input ref={drinkNameRef} type="text" id="name" name="name" placeholder="Enter drink name" />
          </div>

          <div className="form-field">
            <label htmlFor="spirit">Select Spirit</label>
            <select id="spirit" value={selectedSpirit} onChange={(e) => setSelectedSpirit(e.target.value)}>
              <option value="">--Select a spirit--</option>
              <option value="Vodka">Vodka</option>
              <option value="Gin">Gin</option>
              <option value="Tequila">Tequila</option>
              <option value="Rum">Rum</option>
              <option value="Whiskey">Whiskey</option>
              <option value="Brandy">Brandy</option>

              {/* {spirits.map(spirit => (
                <option key={spirit.id} value={spirit.name}>{spirit.name}</option>
              ))} */}
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="spirit-quantity">Amount (in ounces)</label>
            <input ref={spiritQuantityRef} type="number" id="spirit-quantity" name="spirit-quantity" placeholder="Enter amount in oz" />
            <button type="button" onClick={handleAddSpirit}>Add Spirit</button>
          </div>

          {/* Display selected spirit */}
          {spiritDetails && (
            <div className="spirit-display">
              <h3>Selected Spirit:</h3>
              <p>{spiritDetails.name} {spiritDetails.quantity} oz</p>
            </div>
          )}
        </div>

        {/* Ingredients Section */}
        <div className="ingredients-section">
          <form ref={formRef} className="ingredients-input">
            <div className="form-field">
              <label htmlFor="quantity">Quantity</label>
              <input ref={quantityRef} type="text" id="quantity" name="quantity" placeholder="Enter quantity" />
            </div>
            <div className="form-field">
              <label htmlFor="unit">Unit (e.g., oz, dashes, pieces)</label>
              <input ref={unitRef} type="text" id="unit" name="unit" placeholder="Enter unit" />
            </div>
            <div className="form-field">
              <label htmlFor="ingredient-name">Ingredient Name</label>
              <input ref={ingredientNameRef} type="text" id="ingredient-name" name="ingredient-name" placeholder="Enter ingredient" />
            </div>
            <button onClick={handleAddIngredient}>Add Ingredient</button>
          </form>

          {/* Display ingredients */}
          {ingredients.length !== 0 && (
            <div className="ingredient-list">
              <h3>Ingredients</h3>
              <table>
                <thead>
                  <tr>
                    <th>Quantity</th>
                    <th>Unit</th>
                    <th>Ingredient Name</th>
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
          )}
        </div>
      </div>

      {/* Instructions Section */}

      <div className="instructions-form-field">
        <label htmlFor="instructions">Instructions</label>
        <textarea ref={instructionsRef} id="instructions" name=
        "instructions" placeholder="Enter instructions"></textarea>
      </div>

      <button onClick={handleCreateDrink}>Submit Drink</button>
    </div>
  );
}

export default DrinkSubmission;
