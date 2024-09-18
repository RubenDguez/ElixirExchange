import express from 'express';
import { createIngredients, deleteIngredient, getIngredientsByDrink } from '../../controllers/elixirIngredients-controller';

const router = express.Router();

router.post('/', createIngredients);
router.get('/:id', getIngredientsByDrink);
router.delete('/:id', deleteIngredient);

export { router as ingredientRouter };
