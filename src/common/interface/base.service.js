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
        if (!this._sequelize) throw new Error('Sequelize instance not found in DI container');
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
        this.log('runService', `listAndCount ${this.modelName}`, options);
        try {
            return await this.model.findAndCountAll(options);
        } catch (err) {
            throw err;
        }
    }

    async count(options = {}) {
        this.log('runService', `count ${this.modelName}`, options);
        try {
            return await this.model.count(options);
        } catch (err) {
            this.log('error', `Error in count ${this.modelName}: ${err.message}`, {
                stack: err.stack,
                options,
            });
            throw err;
        }
    }

    async getById(id, options = {}) {
        this.log('runService', `getById ${this.modelName} id=${id}`);
        try {
            return await this.model.findByPk(id, options);
        } catch (err) {
            throw err;
        }
    }

    async create(data, options = {}) {
        this.log('runService', `create ${this.modelName}`, data);
        try {
            return await this.model.create(data, options);
        } catch (err) {
            throw err;
        }
    }

    async update(id, data, options = {}) {
        this.log('runService', `update ${this.modelName} id=${id}`, data);
        try {
            const item = await this.getById(id);
            if (!item) {
                this.log('warn', `update failed: ${this.modelName} id=${id} not found`);
                return null;
            }
            await item.update(data, options);
            return item;
        } catch (err) {
            throw err;
        }
    }

    async delete(id, options = {}) {
        this.log('runService', `delete ${this.modelName} id=${id}`);
        try {
            const item = await this.getById(id);
            if (!item) {
                this.log('warn', `delete failed: ${this.modelName} id=${id} not found`);
                return null;
            }
            await item.destroy(options);
            return item;
        } catch (err) {
            throw err;
        }
    }
}
