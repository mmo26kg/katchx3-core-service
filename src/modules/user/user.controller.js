// import buildOptions from '../../common/helper/buildOptions.js';
// import { ok, created, fail, notFound } from '../../common/helper/api.response.js';
// import container from '../../common/helper/di-container.js';
import userModuleConfig from './user.config.js';
import BaseController from '../../common/interface/base.route.js';

class UserController extends BaseController {
    constructor() {
        super('userService', userModuleConfig);
    }
}

export default UserController;
