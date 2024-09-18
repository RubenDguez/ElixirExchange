import { Request, Response } from "express";
import { Category, Drink } from "../models";


//*CREATE
export const createCategory = async (req: Request, res: Response) => {
    const { name } = req.body;
    try {
        const newCategory = await Category.create({ name });
        res.status(201).json(newCategory);
    } catch (error) {
        const ERROR = error as Error;
        res.status(500).json({ message: ERROR.message })
    }
};

//*READ
//Get All Categories
export const getAllCategories = async (_req: Request, res: Response) => {
    try {
        const categories = await Category.findAll({ include: [Drink] });
        res.json(categories);
    } catch (error) {
        const ERROR = error as Error;
        res.status(500).json({ message: ERROR.message })
    }
};

//*UPDATE
export const updateCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const category = await Category.findByPk(id);
        if (category) {
            category.name = name;
            await category.save();
            res.json(category);

            return
        }
        res.status(404).json({ message: 'User not found' });
    } catch (error) {
        const ERROR = error as Error;
        res.status(500).json({ message: ERROR.message })
    }
}