// User module aggregator with lazy DI resolution (avoids resolving before main registers sequelize)
import express from 'express';
import DIContainer from '../../common/helper/di-container.js';
import UserController from './user.controller.js';
import UserService from './user.service.js';
import defineUserModel from './user.model.js';

let initialized = false;
let cachedRouter = null;

function initOnce() {
    if (initialized) return;

    // Resolve sequelize after main.js registers it in DI
    const sequelize = DIContainer.resolve('sequelize');

    // Ensure model is defined once per sequelize instance
    const userModel = sequelize.models.User || defineUserModel(sequelize);

    // Build service and controller
    const userService = new UserService(userModel);
    const router = express.Router();
    cachedRouter = UserController(router, userService);

    initialized = true;
}

const UserModule = {
    getController() {
        initOnce();
        return cachedRouter;
    },
    getBasePath() {
        return '/users';
    },
    getName() {
        return 'UserModule';
    },
};

export default UserModule;
