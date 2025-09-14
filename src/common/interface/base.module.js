import container from '../helper/di-container.js';
export default class BaseModule {
    constructor(defineModel, moduleService, moduleController, modelConfig) {
        this.defineModel = defineModel;
        this.moduleService = moduleService;
        this.moduleController = moduleController;
        this.modelConfig = modelConfig;
        container.registerClass(this.modelConfig.serviceName, this.moduleService);
        container.registerClass(this.modelConfig.controllerName, this.moduleController);
        this.sequelize = container.get('sequelize');
        this.moduleControllerInstance = container.getWithArgs(
            this.modelConfig.controllerName,
            this.modelConfig
        );
    }
    initApp(app) {
        this.defineModel(this.sequelize, this.modelConfig);
        this.moduleControllerInstance.attachRoutes(app);
    }
}
