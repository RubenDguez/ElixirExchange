import { Request, Response } from 'express';
import { Ingredient } from '../models/index.js';

// * POST /api/ingredients/
export const createIngredients = async (req: Request, res: Response) => {
  const { ingredients } = req.body;
  try {
    const ingredientList = await Ingredient.bulkCreate(ingredients);
    res.status(201).json(ingredientList);
  } catch (error) {
    const ERROR = error as Error;
    res.status(500).json({ message: ERROR.message });
  }
};

// * GET /api/ingredients/:drinkId
export const getIngredientsByDrink = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const ingredients = await Ingredient.findAll({ where: { elixirId: id } });
    if (ingredients) {
      res.json(ingredients);
      return;
    }
    res.status(404).json({ message: 'No ingredients found for the provided dink id.' });
  } catch (error) {
    const ERROR = error as Error;
    res.status(500).json({ message: ERROR.message });
  }
};

// * DELETE /api/ingredients/:id
export const deleteIngredient = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const ingredient = await Ingredient.findByPk(id);

    if (ingredient) {
      await ingredient.destroy();
      res.status(201).json({ message: 'Ingredient removed successfully.' });
      return;
    }
    res.status(404).json({ message: 'No ingredient was found with the provided id.' });
  } catch (error) {
    const ERROR = error as Error;
    res.status(500).json({ message: ERROR.message });
  }
};
