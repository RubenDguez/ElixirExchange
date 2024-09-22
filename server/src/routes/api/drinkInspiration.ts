import express, { Request, Response } from 'express';

const router = express.Router();

interface IDrinks {
  name: string;
  category: string;
  glass: string;
  instructions: string;
  drinkThumb: string;
  ingredients: Object;
}

router.get('/', async (_req: Request, res: Response) => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  // const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=11007');
  const data = await response.json();

  if (data) {
    // filtering out null values and unwanted attributes
    const drink = Object.keys(data['drinks'][0])
      .map((att) => `${att}: ${data['drinks'][0][att]}`)
      .filter(
        (f) =>
          !f.includes('null') &&
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

    // gathering all the ingredients and measures
    const ingredients = drink.filter((f) => f.includes('strIngredient') || f.includes('strMeasure'));
    const ingredientsCount = drink.filter((f) => f.includes('strIngredient')).length;
    const ingObj: Array<{ name: string; measure: string }> = [];

    for (let i = 1; i <= ingredientsCount; i++) {
      let name = ingredients.find((f) => f.includes(`strIngredient${i}`)) || '';
      let measure = ingredients.find((f) => f.includes(`strMeasure${i}`)) || '';

      if (name) name = name.split(':')[1].trim();
      if (measure) measure = measure.split(':')[1].trim();

      ingObj.push({ name, measure });
    }

    // creating the drink object
    const drinkObj: IDrinks = {
      name: drink.find((f) => f.includes('strDrink'))?.split(':')[1].trim() || '',
      category: drink.find((f) => f.includes('strCategory'))?.split(':')[1].trim() || '',
      glass: drink.find((f) => f.includes('strGlass'))?.split(':')[1].trim() || '',
      instructions: drink.find((f) => f.includes('strInstructions'))?.split(':')[1].trim() || '',
      drinkThumb: drink.find((f) => f.includes('strDrinkThumb'))?.split('strDrinkThumb:')[1].trim() || '',
      ingredients: ingObj
    };

    // sending the drink object
    res.status(200).json(drinkObj);
    return;
  }

  res.status(404).json({ message: 'We could not connect with the api' });
});

export { router as drinkInspiration };
