import { DataTypes, Model, Optional, type Sequelize } from 'sequelize';

interface ElixirCategoryAttributes {
  id: number;
  name: string;
}

interface ElixirCategoryCreationAttributes extends Optional<ElixirCategoryAttributes, 'id'> {}

export class ElixirCategory extends Model<ElixirCategoryAttributes, ElixirCategoryCreationAttributes> implements ElixirCategory {
  public id!: number;
  public name!: string;
}

export function ElixirCategoryFactory(sequelize: Sequelize) {
  ElixirCategory.init(
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
        unique: true,
      },
    },
    {
      sequelize,
      underscored: false,
      modelName: 'ElixirCategory',
    },
  );

  return ElixirCategory;
}
