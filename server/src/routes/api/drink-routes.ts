import express from 'express';
import { createDrink, deleteDrink, getAllDrinks, getDrink, updateDrink } from '../../controllers/elixirDrinks-controller.js';

const router = express.Router();

router.post('/', createDrink);
router.get('/', getAllDrinks);
router.get('/:id', getDrink);
router.put('/:id', updateDrink);
router.delete('/:id', deleteDrink);

export { router as drinkRouter };
