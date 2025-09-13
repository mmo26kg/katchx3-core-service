export default class BaseModuleConfig {
    constructor({
        tableName,
        serviceName,
        controllerName,
        singularizedName,
        pluralizedName,
        basePath,
    }) {
        if (!tableName) throw new Error('BaseModuleConfig requires a tableName');
        if (!serviceName) throw new Error('BaseModuleConfig requires a serviceName');
        if (!controllerName) throw new Error('BaseModuleConfig requires a controllerName');
        if (!singularizedName) throw new Error('BaseModuleConfig requires a singularizedName');
        if (!pluralizedName) throw new Error('BaseModuleConfig requires a pluralizedName');
        if (!basePath) throw new Error('BaseModuleConfig requires a basePath');

        this.tableName = tableName;
        this.serviceName = serviceName;
        this.controllerName = controllerName;
        this.singularizedName = singularizedName;
        this.pluralizedName = pluralizedName;
        this.basePath = basePath;
    }
}
