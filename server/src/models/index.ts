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

Drink.hasMany(Ingredient, {
  onDelete: 'CASCADE',
});

Ingredient.belongsTo(Drink);

Category.hasMany(Drink);

Drink.belongsTo(Category);

User.hasMany(Drink);

Drink.belongsTo(User);

export { Category, Drink, Ingredient, sequelize, User };
