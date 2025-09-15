import BaseService from '../../common/interface/base.service.js';

class Service extends BaseService {
    constructor(moduleConfig) {
        super(moduleConfig);
    }

    async getOrdersbyUserId(userId, options = {}) {
        this.log('runService', 'getOrdersbyUserId', { userId, ...options });
        return this.model.findAll({
            where: { userId },
            ...options,
        });
    }
}

export default Service;
