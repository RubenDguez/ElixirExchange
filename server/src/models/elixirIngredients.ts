import { Model, 
        DataTypes, 
        type ForeignKey, 
        type Sequelize, 
        type InferAttributes,
        type InferCreationAttributes,
        } from 'sequelize'
import { ElixirDrinks } from './elixirDrinks';

export class ElixirIngredients extends Model<InferAttributes<ElixirIngredients>, InferCreationAttributes<ElixirIngredients>>
{
    public id!: number;    
    public name!: string;
    public amount!: number;
    public unit!: string;
    public elixirId!: ForeignKey<ElixirDrinks['id']>;
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
        }
    );
    return ElixirIngredients;
}