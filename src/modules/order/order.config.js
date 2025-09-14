import BaseModuleConfig from '../../common/interface/base.config.js';
import { DataTypes } from 'sequelize';

const schema = {
    orderNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
    },
    isPaid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    paidAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
};

class ModuleConfig extends BaseModuleConfig {
    constructor() {
        const singularizedName = 'order';
        const pluralizedName = 'orders';
        super({
            singularizedName,
            pluralizedName,
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
