import { DataTypes } from 'sequelize';
import userModuleConfig from './user.config.js';

function defineUserModel(sequelize) {
    const User = sequelize.define(userModuleConfig.tableName, {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            validate: { isEmail: true },
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    });

    return User;
}
export default defineUserModel;
