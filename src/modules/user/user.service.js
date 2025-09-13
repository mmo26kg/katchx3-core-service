import container from '../../common/helper/di-container.js';

class UserService {
    constructor() {
        this.logger = container.get('logger');
        this.sequelize = container.get('sequelize');
    }

    async listAndCount(options = {}) {
        this.logger.info('Listing and counting users with options:', options);
        return this.sequelize.models.User.findAndCountAll(options);
    }
    async count(options = {}) {
        this.logger.info('Counting users with options:', options);
        return this.sequelize.models.User.count(options);
    }
    async getById(id, options = {}) {
        this.logger.info(`Getting user by ID: ${id}`);
        return this.sequelize.models.User.findByPk(id, options);
    }
    async create(data, options = {}) {
        this.logger.info('Creating new user with data:', data);
        const user = await this.sequelize.models.User.create(data, options);
        if (!user) {
            this.logger.error('User creation failed');
            throw new Error('User creation failed');
        }
        return user;
    }
    async update(id, data, options = {}) {
        this.logger.info(`Updating user ID: ${id} with data:`, data);
        const item = await this.sequelize.models.User.findByPk(id, options);
        if (!item) {
            this.logger.warn(`User ID: ${id} not found for update`);
            return null;
        }
        return item.update(data, options);
    }
    async delete(id, options = {}) {
        this.logger.info(`Deleting user ID: ${id}`);
        const count = await this.sequelize.models.User.destroy({ where: { id }, ...options });
        return count > 0;
    }
}
export default UserService;
