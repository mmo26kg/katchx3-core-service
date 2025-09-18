import BaseModuleConfig from '../../common/interface/base.config.js';
import { DataTypes } from 'sequelize';

const schema = {
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 255],
            msg: 'Title must be between 1 and 255 characters',
        },
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            len: [0, 1000],
            msg: 'Description can be up to 1000 characters',
        },
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            isDecimal: { msg: 'Amount must be a decimal value' },
            min: { args: [0], msg: 'Amount must be positive' },
        },
    },
    currency: {
        type: DataTypes.STRING(3),
        allowNull: false,
        validate: {
            isAlpha: { msg: 'Currency must be alphabetic' },
            len: { args: [3, 3], msg: 'Currency must be a 3-letter code' },
        },
    },
};

class ModuleConfig extends BaseModuleConfig {
    constructor() {
        const singularizedName = 'userExpense';
        const pluralizedName = 'userExpenses';
        const camelCaseName = 'userExpense';
        const pascalCaseName = 'UserExpense';
        const snakeCaseName = 'user-expense';
        super({
            camelCaseName,
            pascalCaseName,
            snakeCaseName,
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
