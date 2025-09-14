import BaseModule from '../../common/interface/base.module.js';
import moduleConfig from './sample.config.js';
import defineModel from './sample.model.js';
import Service from './sample.service.js';
import Controller from './sample.controller.js';

export default class SampleModule extends BaseModule {
    constructor() {
        super(defineModel, Service, Controller, moduleConfig);
    }
}
