// Khai báo relationships giữa các model ở đây
export default function defineRelationships(sequelize) {
    const { User } = sequelize.models;
    const { Order } = sequelize.models;
    if (!User || !Order) {
        console.log('All Models :', sequelize.models);
        throw new Error('Model not found');
    }

    User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
    Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });
}
