import container from '../../common/helper/di-container.js';
import defineUserModel from './user.model.js';
import UserService from './user.service.js';
import UserController from './user.controller.js';

class UserModule {
    constructor() {
        container.register('userService', () => new UserService());
        container.register('userController', () => new UserController());

        this.sequelize = container.get('sequelize');
        this.userController = container.get('userController');
    }
    initApp(app) {
        defineUserModel(this.sequelize);
        this.userController.attachRoutes(app);
    }
}
export default UserModule;
