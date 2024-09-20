declare module "*.md"

interface IDrinks {
    name: string;
    category: string;
    glass: string;
    instructions: string;
    drinkThumb: string;
    ingredients: Array<{ name: string; measure: string }>;
  }
