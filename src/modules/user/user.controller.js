import userModuleConfig from './user.config.js';
import BaseController from '../../common/interface/base.controller.js';
import { ok, fail } from '../../common/helper/api.response.js';

class UserController extends BaseController {
    constructor() {
        super();
    }

    // You can add user-specific controller methods here
    registerCustomRoutes(router) {
        router.get('/active', async (req, res) => {
            try {
                const options = buildOptions(req.query);
                const activeUsers = await this.service.getActiveUsers(options);
                return ok(activeUsers).send(res);
            } catch (error) {
                this.logger.error(`Failed to fetch active ${this.pluralizedName}`, {
                    error: error.message,
                });
                return fail(`Failed to fetch active ${this.pluralizedName}`, error).send(res);
            }
        });
    }
}

export default UserController;
