import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';
import { UserFactory } from './user.js';
import { ElixirCategoryFactory } from './elixirCategory.js';
import { ElixirIngredientsFactory } from './elixirIngredients.js';
import { ElixirDrinksFactory } from './elixirDrinks.js';

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
  onDelete: 'CASCADE'
})

Ingredient.belongsTo(Drink);

Category.hasMany(Drink);

Drink.belongsTo(Category);

User.hasMany(Drink);

Drink.belongsTo(User);

export { sequelize, User, Category, Ingredient, Drink };
