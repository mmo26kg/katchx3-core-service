export default class BaseModuleConfig {
    constructor({
        modelName,
        tableName,
        serviceName,
        controllerName,
        singularizedName,
        pluralizedName,
        camelCaseName,
        pascalCaseName,
        snakeCaseName,
        basePath,
        schema,
    }) {
        if (!modelName) throw new Error('BaseModuleConfig requires a modelName');
        if (!tableName) throw new Error('BaseModuleConfig requires a tableName');
        if (!serviceName) throw new Error('BaseModuleConfig requires a serviceName');
        if (!controllerName) throw new Error('BaseModuleConfig requires a controllerName');
        if (!singularizedName) throw new Error('BaseModuleConfig requires a singularizedName');
        if (!pluralizedName) throw new Error('BaseModuleConfig requires a pluralizedName');
        if (!basePath) throw new Error('BaseModuleConfig requires a basePath');
        if (!schema) throw new Error('BaseModuleConfig requires a schema');
        if (!camelCaseName) throw new Error('BaseModuleConfig requires a camelCaseName');
        if (!pascalCaseName) throw new Error('BaseModuleConfig requires a pascalCaseName');
        if (!snakeCaseName) throw new Error('BaseModuleConfig requires a snakeCaseName');

        this.camelCaseName = camelCaseName;
        this.pascalCaseName = pascalCaseName;
        this.snakeCaseName = snakeCaseName;
        this.modelName = modelName;
        this.tableName = tableName;
        this.serviceName = serviceName;
        this.controllerName = controllerName;
        this.singularizedName = singularizedName;
        this.pluralizedName = pluralizedName;
        this.basePath = basePath;
        this.schema = schema;
    }
}
