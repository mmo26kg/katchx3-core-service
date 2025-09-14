function defineModel(sequelize, moduleConfig) {
    const User = sequelize.define(moduleConfig.tableName, moduleConfig.schema);
    return User;
}
export default defineModel;
