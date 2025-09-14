function defineModel(sequelize, moduleConfig) {
    const Model = sequelize.define(moduleConfig.modelName, moduleConfig.schema);
    return Model;
}
export default defineModel;
