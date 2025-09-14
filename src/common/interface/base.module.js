import container from '../helper/di-container.js';
export default class BaseModule {
    constructor(defineModel, moduleService, moduleController, moduleConfig) {
        this.defineModel = defineModel;
        this.moduleService = moduleService;
        this.moduleController = moduleController;
        this.moduleConfig = moduleConfig;
        container.registerClass(this.moduleConfig.serviceName, this.moduleService);
        container.registerClass(this.moduleConfig.controllerName, this.moduleController);
        this.sequelize = container.get('sequelize');
        this.moduleControllerInstance = container.getWithArgs(
            this.moduleConfig.controllerName,
            this.moduleConfig
        );
    }
    initApp(app) {
        this.defineModel(this.sequelize, this.moduleConfig);
        this.moduleControllerInstance.attachRoutes(app);
    }
}
