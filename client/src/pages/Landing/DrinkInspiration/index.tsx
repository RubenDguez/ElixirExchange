import './drinkInspiration.css';

export default function DrinkInspiration({ name, category, glass, instructions, drinkThumb, ingredients }: Partial<IDrinks>) {
  return (
    <div style={{ backgroundImage: `url(${drinkThumb})` }} className="drink-inspiration-background">
      <div className="drink-inspiration">
        <h2>{name}</h2>
        <div>
          <div className="drink-inspiration-gen-info">
            <div className="info-group">
              <div className="info">
                <h5>Category</h5>
                <p>{category}</p>
              </div>
              <div className="info">
                <h5>Serving Glass</h5>
                <p>{glass}</p>
              </div>
            </div>
            <div>
              <img src={drinkThumb} width={400} height={300} alt={`drink inspiration: ${name}`} />
            </div>
          </div>
          <div>
            <h4>Ingredients</h4>
            <table className="drink-inspiration-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Measurement</th>
                </tr>
              </thead>
              <tbody>
                {ingredients &&
                  ingredients.length &&
                  ingredients.map((ingredient, index) => (
                    <tr key={ingredient.name + index}>
                      <td>{ingredient.name}</td>
                      <td>{ingredient.measure}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div>
            <h4>Instructions</h4>
            <p>{instructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
