import { Request, Response, Router } from 'express';
import { ElixirIngredients } from '../models/elixirIngredients.js';
import { Category, Drink, User } from '../models/index.js';

const router = Router();

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  console.log('id', id);

  try {
    const drink = await Drink.findOne({ where: { id }, include: [ElixirIngredients, { model: Category, as: 'category' } , { model: User, attributes: { exclude: ['password'] }, as: 'user' }] });

    if (drink) {
      res.status(200).json(drink);
      return;
    }
    res.status(404).json({ message: 'Drink not found' });
  } catch (error) {
    const ERROR = error as Error;
    res.status(500).json({ message: ERROR.message });
  }
});

router.get('/cat/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const category = await Category.findOne({ where: { id: parseInt(id) } });
    if (category) {
      res.status(200).json(category);
      return;
    }

    res.status(404).json({ message: 'Category not found' });
  } catch (error) {
    const ERROR = error as Error;
    res.status(500).json({ message: ERROR.message });
  }
});

export { router as drinksRouter };
