declare module '*.md';

interface IDrinks {
  name: string;
  category: string;
  glass: string;
  instructions: string;
  drinkThumb: string;
  ingredients: Array<{ name: string; measure: string }>;
}

interface IMyDrink {
  userId: number;
  name: string;
  categoryId: string;
  picture: string;
  ingredients: IIngredients[];
  instructions: string;
  description: string;
}

interface IIngredients {
  quantity: number;
  units: string;
  name: string;
}
