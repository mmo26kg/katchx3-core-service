// Product model definition
import { sequelize } from '../../config/database.js';
import { DataTypes } from 'sequelize';
import defaultModelOptions from '../../common/interface/base.model.js';

export const Product = sequelize.define(
    'product',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        ...defaultModelOptions,
    }
);

export default Product;
