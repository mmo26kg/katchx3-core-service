import BaseService from '../../common/interface/base.service.js';
import userModuleConfig from './user.config.js';

class UserService extends BaseService {
    constructor() {
        super();
    }

    async getActiveUsers(options = {}) {
        this.log('info', 'getActiveUsers', options);
        return this.model.findAll({
            where: { isActive: true },
            ...options,
        });
    }
}

export default UserService;
