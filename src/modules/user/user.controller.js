import BaseController from '../../common/interface/base.controller.js';
import { ok, fail } from '../../common/helper/api.response.js';
import buildOptions from '../../common/helper/buildOptions.js';

class Controller extends BaseController {
    constructor(moduleConfig) {
        super(moduleConfig);
    }
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

export default Controller;
