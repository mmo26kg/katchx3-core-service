import container from '../helper/di-container.js';

export default class BaseService {
    constructor(moduleConfig) {
        // this.configAddress = container.get('configAddress');
        this.moduleConfig = moduleConfig;
        this.modelName = this.moduleConfig.tableName;
        this.container = container;
        this.logger = this.container.get('logger');
        this._sequelize = null;
    }

    // Lazy resolve sequelize để tránh timing issues
    get sequelize() {
        if (!this._sequelize) this._sequelize = this.container.get('sequelize');
        return this._sequelize;
    }

    // Lấy model theo tên
    get model() {
        const m = this.sequelize?.models?.[this.modelName];
        if (!m) throw new Error(`Model '${this.modelName}' not found`);
        return m;
    }

    // Ẩn dữ liệu nhạy cảm khi log
    sanitizeForLog(payload) {
        if (!payload || typeof payload !== 'object') return payload;
        const clone = Array.isArray(payload)
            ? payload.map((x) => this.sanitizeForLog(x))
            : { ...payload };
        const redactKeys = ['password', 'token', 'accessToken', 'refreshToken', 'secret', 'apiKey'];
        for (const k of Object.keys(clone)) {
            if (redactKeys.includes(k)) clone[k] = '[REDACTED]';
        }
        return clone;
    }

    log(level, message, meta) {
        try {
            if (meta !== undefined) {
                this.logger[level](
                    `${this.constructor.name} • ${message}`,
                    this.sanitizeForLog(meta)
                );
            } else {
                this.logger[level](`${this.constructor.name} • ${message}`);
            }
        } catch {
            // no-op
        }
    }

    // CRUD cơ bản
    async listAndCount(options = {}) {
        this.log('info', `listAndCount ${this.modelName}`, options);
        return this.model.findAndCountAll(options);
    }

    async count(options = {}) {
        this.log('info', `count ${this.modelName}`, options);
        return this.model.count(options);
    }

    async getById(id, options = {}) {
        this.log('info', `getById ${this.modelName} id=${id}`);
        return this.model.findByPk(id, options);
    }

    async create(data, options = {}) {
        this.log('info', `create ${this.modelName}`, data);
        return this.model.create(data, options);
    }

    async update(id, data, options = {}) {
        this.log('info', `update ${this.modelName} id=${id}`, data);
        const item = await this.model.findByPk(id, options);
        if (!item) {
            this.log('warn', `${this.modelName} id=${id} not found for update`);
            return null;
        }
        return item.update(data, options);
    }

    async delete(id, options = {}) {
        this.log('info', `delete ${this.modelName} id=${id}`);
        const count = await this.model.destroy({ where: { id }, ...options });
        return count > 0;
    }
}
