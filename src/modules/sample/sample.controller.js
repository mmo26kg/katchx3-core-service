import BaseController from '../../common/interface/base.controller.js';

class Controller extends BaseController {
    constructor(moduleConfig) {
        super(moduleConfig);
    }

    registerCustomRoutes(router) {
        router.get('/custom-route', async (req, res) => {
            try {
                console.log('Custom route accessed');
                res.json({ message: 'Custom route response' });
            } catch (error) {
                this.handleError(res, error);
            }
        });
    }
}

export default Controller;
