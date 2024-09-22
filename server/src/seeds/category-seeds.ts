import { ElixirCategory } from "../models/elixirCategory.js";

export const seedCategory = async () => {
  await ElixirCategory.bulkCreate([
    { name: 'Rum' },
    { name: 'Vodka' },
    { name: 'Tequila' },
    { name: 'Whiskey' },
    { name: 'Gin' },
    { name: 'Brandy' },
  ], { individualHooks: true });
};
