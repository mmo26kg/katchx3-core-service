import BaseModule from '../../common/interface/base.module.js';
import moduleConfig from './order.config.js';
import defineModel from './order.model.js';
import Service from './order.service.js';
import Controller from './order.controller.js';

export default class OrderModule extends BaseModule {
    constructor() {
        super(defineModel, Service, Controller, moduleConfig);
    }
}
