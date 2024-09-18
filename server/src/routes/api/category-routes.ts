import express from 'express';
import { createCategory, getAllCategories, updateCategory } from '../../controllers/elixirCategory-controller';

const router = express.Router();

router.get('/', getAllCategories);

router.post('/', createCategory);

router.put('/:id', updateCategory);

export { router as categoryRouter };
