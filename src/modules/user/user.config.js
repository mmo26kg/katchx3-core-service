import BaseModuleConfig from '../../common/interface/base.config.js';

class ModuleConfig extends BaseModuleConfig {
    constructor() {
        const singularizedName = 'user';
        const pluralizedName = 'users';
        super({
            singularizedName,
            pluralizedName,
            tableName: pluralizedName,
            serviceName: `${singularizedName}Service`,
            controllerName: `${singularizedName}Controller`,
            basePath: `/${pluralizedName}`,
        });
    }
}

const moduleConfig = new ModuleConfig();

export default moduleConfig;
