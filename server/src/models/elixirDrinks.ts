import { CreationOptional, DataTypes, Model, type ForeignKey, type InferAttributes, type InferCreationAttributes, type Sequelize } from 'sequelize';
import { ElixirCategory } from './elixirCategory';
import { User } from './user';

export class ElixirDrinks extends Model<InferAttributes<ElixirDrinks>, InferCreationAttributes<ElixirDrinks>> {
  public id!: CreationOptional<number>;
  public name!: string;
  public description!: string;
  public picture!: string;
  public instructions!: string;
  public categoryId!: ForeignKey<ElixirCategory['id']>;
  public userId!: ForeignKey<User['id']>;
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
