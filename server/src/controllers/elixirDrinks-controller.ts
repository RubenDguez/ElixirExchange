import { Request, Response } from 'express';
import { Drink } from '../models';

// * POST /api/drink/
export const createDrink = async (req: Request, res: Response) => {
  const { name, description, picture, instructions, categoryId, userId } = req.body;
  try {
    const newDrink = await Drink.create({ name, description, picture, instructions, categoryId, userId });
    res.status(201).json(newDrink);
  } catch (error) {
    const ERROR = error as Error;
    res.status(500).json({ message: ERROR.message });
  }
};

// * GET /api/drink/
export const getAllDrinks = async (_req: Request, res: Response) => {
  try {
    const drinks = await Drink.findAll();
    res.status(200).json(drinks);
  } catch (error) {
    const ERROR = error as Error;
    res.status(500).json({ message: ERROR.message });
  }
};

// * GET /api/drink/:id
export const getDrink = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const drink = await Drink.findByPk(id);
    if (drink) {
      res.json(drink);
      return;
    }
    res.status(404).json({ message: 'Drink was not found.' });
  } catch (error) {
    const ERROR = error as Error;
    res.status(500).json({ message: ERROR.message });
  }
};

// * PUT /api/drink/:id
export const updateDrink = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, picture, instructions, categoryId } = req.body;
  try {
    const drink = await Drink.findByPk(id);

    if (drink) {
      drink.name = name;
      drink.description = description;
      drink.picture = picture;
      drink.instructions = instructions;
      drink.categoryId = categoryId;

      await drink.save();
      res.json(drink);
      return;
    }

    res.status(404).json({ message: 'Drink was not found.' });
  } catch (error) {
    const ERROR = error as Error;
    res.status(500).json({ message: ERROR.message });
  }
};

// * DELETE /api/drink/:id
export const deleteDrink = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const drink = await Drink.findByPk(id);
    if (drink) {
      await drink.destroy();
      res.status(201).json({ message: 'Drink deleted successfully' });
      return;
    }
    res.status(404).json({ message: 'Drink was not found.' });
  } catch (error) {
    const ERROR = error as Error;
    res.status(500).json({ message: ERROR.message });
  }
};
