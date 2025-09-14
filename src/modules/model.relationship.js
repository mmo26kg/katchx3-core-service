// Khai báo relationships giữa các model ở đây
export default function defineRelationships(sequelize) {
    const { users } = sequelize.models;
    const { orders } = sequelize.models;
    if (!users || !orders) {
        throw new Error('Model not found');
    }

    users.hasMany(orders, { foreignKey: 'userId', as: 'orders' });
    orders.belongsTo(users, { foreignKey: 'userId', as: 'user' });
}
