import BaseModule from '../../common/interface/base.module.js';
import moduleConfig from './userExpense.config.js';
import defineModel from './userExpense.model.js';
import Service from './userExpense.service.js';
import Controller from './userExpense.controller.js';

export default class UserExpenseModule extends BaseModule {
    constructor() {
        super(defineModel, Service, Controller, moduleConfig);
    }
}
