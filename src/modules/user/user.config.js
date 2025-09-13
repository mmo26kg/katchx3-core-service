import BaseModuleConfig from '../../common/interface/base.config.js';

class UserModuleConfig extends BaseModuleConfig {
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

const userModuleConfig = new UserModuleConfig();

export default userModuleConfig;
