import {
    Model,
    DataTypes,
    type ForeignKey,
    type Sequelize,
    type InferAttributes,
    type InferCreationAttributes,
} from 'sequelize'
import { User } from './user';
import { ElixirCategory } from './elixirCategory';

export class ElixirDrinks extends Model<InferAttributes<ElixirDrinks>, InferCreationAttributes<ElixirDrinks>> {
    public id!: number;
    public name!: string;
    public decription!: string;
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
            decription: {
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
        }
    );
    return ElixirDrinks;
}
