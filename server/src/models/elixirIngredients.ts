import { DataTypes, Model, type ForeignKey, type InferAttributes, type InferCreationAttributes, type Sequelize } from 'sequelize';
import { ElixirDrinks } from './elixirDrinks';

export class ElixirIngredients extends Model<InferAttributes<ElixirIngredients>, InferCreationAttributes<ElixirIngredients>> {
  declare id: number;
  declare name: string;
  declare amount: number;
  declare unit: string;
  declare elixirId: ForeignKey<ElixirDrinks['id']>;
}

export function ElixirIngredientsFactory(sequelize: Sequelize) {
  ElixirIngredients.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      unit: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      underscored: false,
      modelName: 'ElixirIngredients',
    },
  );
  return ElixirIngredients;
}
