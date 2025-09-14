import container from '../../common/helper/di-container.js';
import defineUserModel from './user.model.js';
import UserService from './user.service.js';
import UserController from './user.controller.js';
import userModuleConfig from './user.config.js';
class UserModule {
    constructor() {
        container.registerClass(userModuleConfig.serviceName, UserService);
        container.registerClass(userModuleConfig.controllerName, UserController);
        this.sequelize = container.get('sequelize');
        this.userController = container.getWithArgs(
            userModuleConfig.controllerName,
            userModuleConfig
        );
    }
    initApp(app) {
        defineUserModel(this.sequelize, userModuleConfig);
        this.userController.attachRoutes(app);
    }
}
export default UserModule;
