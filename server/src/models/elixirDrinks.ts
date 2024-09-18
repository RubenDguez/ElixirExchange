import { CreationOptional, DataTypes, Model, type ForeignKey, type InferAttributes, type InferCreationAttributes, type Sequelize } from 'sequelize';
import { ElixirCategory } from './elixirCategory';
import { User } from './user';

export class ElixirDrinks extends Model<InferAttributes<ElixirDrinks>, InferCreationAttributes<ElixirDrinks>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: string;
  declare picture: string;
  declare instructions: string;
  declare categoryId: ForeignKey<ElixirCategory['id']>;
  declare userId: ForeignKey<User['id']>;
}

export function ElixirDrinksFactory(sequelize: Sequelize) {
  ElixirDrinks.init(
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
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      instructions: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      underscored: false,
      modelName: 'ElixirDrinks',
    },
  );
  return ElixirDrinks;
}
