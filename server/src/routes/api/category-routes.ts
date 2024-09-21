import express from 'express';
import { createCategory, deleteCategory, getAllCategories, updateCategory } from '../../controllers/elixirCategory-controller.js';

const router = express.Router();

router.get('/', getAllCategories);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export { router as categoryRouter };
