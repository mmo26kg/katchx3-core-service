import { DataTypes } from 'sequelize';
function defineModel(sequelize, moduleConfig) {
    const Model = sequelize.define(
        moduleConfig.modelName,
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            ...moduleConfig.schema,
        },
        {
            timestamps: true,
            paranoid: true,
        }
    );

    return Model;
}
export default defineModel;
