class BaseModuleConfig {
    constructor({
        moduleName,
        tableName,
        singularizedName,
        pluralizedName,
        basePath,
        description,
    }) {
        this.moduleName = moduleName;
        this.tableName = tableName;
        this.singularizedName = singularizedName;
        this.pluralizedName = pluralizedName;
        this.basePath = basePath;
        this.description = description;
    }
}

class UserModuleConfig extends BaseModuleConfig {
    constructor() {
        super({
            moduleName: 'User',
            tableName: 'users',
            singularizedName: 'user',
            pluralizedName: 'users',
            basePath: '/users',
        });
    }
}
UserModuleConfig.prototype.description = {
    description: 'User management endpoints',
};

const userModuleConfig = new UserModuleConfig();

export default userModuleConfig;
