import BaseController from '../../common/interface/base.controller.js';

class Controller extends BaseController {
    constructor(moduleConfig) {
        super(moduleConfig);
    }
    registerCustomRoutes(router) {
        router.get('/orders-by-user/:userId', async (req, res) => {
            try {
                const userId = req.params.userId;
                const options = this.buildOptions(req.query);
                const orders = await this.service.getOrdersbyUserId(userId, options);
                return this.ok(orders).send(res);
            } catch (error) {
                this.handleError(res, error);
            }
        });
    }
}

export default Controller;
