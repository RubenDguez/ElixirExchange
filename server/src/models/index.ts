import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { ElixirCategoryFactory } from './elixirCategory.js';
import { ElixirDrinksFactory } from './elixirDrinks.js';
import { ElixirIngredientsFactory } from './elixirIngredients.js';
import { UserFactory } from './user.js';

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL, { ssl: true })
  : new Sequelize(process.env.DB_NAME || '', process.env.DB_USER || '', process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'postgres',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

const User = UserFactory(sequelize);
const Category = ElixirCategoryFactory(sequelize);
const Ingredient = ElixirIngredientsFactory(sequelize);
const Drink = ElixirDrinksFactory(sequelize);

Drink.hasMany(Ingredient, {foreignKey: 'elixirId'});
Ingredient.belongsTo(Drink, {foreignKey: 'elixirId', as: 'elixir'});

Category.hasMany(Drink, {foreignKey: 'categoryId'});
Drink.belongsTo(Category, {foreignKey: 'categoryId', as: 'category'});

User.hasMany(Drink, {foreignKey: 'userId'});
Drink.belongsTo(User, {foreignKey: 'userId', as: 'user'});

export { Category, Drink, Ingredient, sequelize, User };
