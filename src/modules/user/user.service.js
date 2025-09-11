function UserService(userModel) {
    if (!userModel) {
        throw new Error('User model is required');
    }

    this.listAndCount = async (options = {}) => {
        return userModel.findAndCountAll(options);
    };

    this.count = async (options = {}) => {
        return userModel.count(options);
    };

    this.getById = async (id, options = {}) => {
        return userModel.findByPk(id, options);
    };

    this.create = async (data, options = {}) => {
        return userModel.create(data, options);
    };

    this.update = async (id, data, options = {}) => {
        const item = await this.getById(id, options);
        if (!item) return null;
        return item.update(data, options);
    };

    this.delete = async (id, options = {}) => {
        const count = await userModel.destroy({ where: { id }, ...options });
        return count > 0;
    };
}

export default UserService;
