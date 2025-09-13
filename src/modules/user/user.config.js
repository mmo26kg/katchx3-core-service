import BaseModuleConfig from '../../common/interface/base.config.js';

class UserModuleConfig extends BaseModuleConfig {
    constructor() {
        super({
            moduleName: 'User',
            tableName: 'users',
            serviceName: 'userService',
            controllerName: 'userController',
            singularizedName: 'user',
            pluralizedName: 'users',
            basePath: '/users',
        });
    }
}

const userModuleConfig = new UserModuleConfig();

export default userModuleConfig;
