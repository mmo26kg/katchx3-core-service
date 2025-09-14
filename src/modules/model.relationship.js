// Khai báo relationships giữa các model ở đây
export default function defineRelationships(sequelize) {
    const { user } = sequelize.models;
    const { order } = sequelize.models;
    if (!user || !order) {
        throw new Error('Model not found');
    }

    user.hasMany(order, { foreignKey: 'userId', as: 'orders' });
    order.belongsTo(user, { foreignKey: 'userId', as: 'user' });
}
