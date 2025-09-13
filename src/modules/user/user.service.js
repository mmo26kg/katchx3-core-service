// function UserService(userModel) {
//     if (!userModel) {
//         throw new Error('User model is required');
//     }

//     this.listAndCount = async (options = {}) => {
//         return userModel.findAndCountAll(options);
//     };

//     this.count = async (options = {}) => {
//         return userModel.count(options);
//     };

//     this.getById = async (id, options = {}) => {
//         return userModel.findByPk(id, options);
//     };

//     this.create = async (data, options = {}) => {
//         return userModel.create(data, options);
//     };

//     this.update = async (id, data, options = {}) => {
//         const item = await this.getById(id, options);
//         if (!item) return null;
//         return item.update(data, options);
//     };

//     this.delete = async (id, options = {}) => {
//         const count = await userModel.destroy({ where: { id }, ...options });
//         return count > 0;
//     };
// }

// export default UserService;

import container from '../../common/helper/di-container.js';

class UserService {
    constructor() {
        this.logger = container.get('logger');
        this.sequelize = container.get('sequelize');
    }
    async listAndCount(options = {}) {
        this.logger.info('Listing and counting users with options:', options);
        return this.sequelize.models.Users.findAndCountAll(options);
    }
    async count(options = {}) {
        this.logger.info('Counting users with options:', options);
        return this.sequelize.models.Users.count(options);
    }
    async getById(id, options = {}) {
        this.logger.info(`Getting user by ID: ${id}`);
        return this.sequelize.models.Users.findByPk(id, options);
    }
    async create(data, options = {}) {
        this.logger.info('Creating new user with data:', data);
        return this.sequelize.models.Users.create(data, options);
    }
    async update(id, data, options = {}) {
        this.logger.info(`Updating user ID: ${id} with data:`, data);
        const item = await this.sequelize.models.Users.findByPk(id, options);
        if (!item) {
            this.logger.warn(`User ID: ${id} not found for update`);
            return null;
        }
        return item.update(data, options);
    }
    async delete(id, options = {}) {
        this.logger.info(`Deleting user ID: ${id}`);
        const count = await this.sequelize.models.Users.destroy({ where: { id }, ...options });
        return count > 0;
    }
}
export default UserService;
