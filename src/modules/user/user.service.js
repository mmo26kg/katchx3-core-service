import BaseService from '../../common/interface/base.service.js';

class Service extends BaseService {
    constructor(moduleConfig) {
        super(moduleConfig);
    }

    async getActiveUsers(options = {}) {
        this.log('info', 'getActiveUsers', options);
        return this.model.findAll({
            where: { isActive: true },
            ...options,
        });
    }
}

export default Service;
