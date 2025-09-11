// BaseModule: common structure for feature modules
export default class BaseModule {
    constructor({ basePath, router, service = null, model = null, name = null } = {}) {
        if (!basePath) throw new Error('BaseModule requires basePath');
        if (!router) throw new Error('BaseModule requires router');
        this.basePath = basePath;
        this.router = router;
        this.service = service;
        this.model = model;
        this.name = name || basePath.replace(/\//g, '') || 'Module';
    }

    isValid() {
        return Boolean(this.basePath && this.router);
    }
}
