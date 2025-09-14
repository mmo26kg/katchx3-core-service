import BaseModule from '../../common/interface/base.module.js';
import moduleConfig from './user.config.js';
import defineModel from './user.model.js';
import Service from './user.service.js';
import Controller from './user.controller.js';

export default class UserModule extends BaseModule {
    constructor() {
        super(defineModel, Service, Controller, moduleConfig);
    }
}
