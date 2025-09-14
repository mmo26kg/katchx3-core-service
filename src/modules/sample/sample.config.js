import BaseModuleConfig from '../../common/interface/base.config.js';
import { DataTypes } from 'sequelize';

const schema = {};

class ModuleConfig extends BaseModuleConfig {
    constructor() {
        const singularizedName = 'sample';
        const pluralizedName = 'samples';
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
