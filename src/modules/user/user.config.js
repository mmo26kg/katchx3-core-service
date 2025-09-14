import BaseModuleConfig from '../../common/interface/base.config.js';
import { DataTypes } from 'sequelize';

const schema = {
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
    age: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
};

class ModuleConfig extends BaseModuleConfig {
    constructor() {
        const singularizedName = 'user';
        const pluralizedName = 'users';
        super({
            singularizedName,
            pluralizedName,
            modelName: singularizedName,
            tableName: pluralizedName,
            serviceName: `${singularizedName}Service`,
            controllerName: `${singularizedName}Controller`,
            basePath: `/${pluralizedName}`,
            schema: schema,
        });
    }
}

const moduleConfig = new ModuleConfig();

export default moduleConfig;
