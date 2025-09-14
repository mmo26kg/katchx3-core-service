import container from '../helper/di-container.js';
import express from 'express';
import { ok, fail, notFound, created } from '../helper/api.response.js';
import buildOptions from '../helper/buildOptions.js';

export default class BaseController {
    constructor(moduleConfig) {
        this.logger = container.get('logger');
        this.moduleConfig = moduleConfig;
        this.service = container.getWithArgs(this.moduleConfig.serviceName, this.moduleConfig);
        this.basePath = this.moduleConfig.basePath;
        this.singularizedName = this.moduleConfig.singularizedName;
        this.pluralizedName = this.moduleConfig.pluralizedName;
        this.buildOptions = buildOptions;
        this.ok = ok;
        this.fail = fail;
        this.notFound = notFound;
        this.created = created;
    }

    registerCustomRoutes(_router) {
        // Override in subclass if needed
    }

    attachRoutes(app) {
        const router = express.Router();

        this.registerCustomRoutes(router);

        router.get(`/`, async (req, res) => {
            try {
                const options = buildOptions(req.query);
                const result = await this.service.listAndCount(options);
                return ok(result, {
                    page: options.page,
                    pageSize: options.pageSize,
                    offset: options.offset,
                    total: result.count,
                    totalPages: Math.ceil(result.count / options.pageSize) || 1,
                    hasNext: options.page * options.pageSize < result.count,
                    hasPrevious: options.page > 1,
                    sort: options.sort,
                    filters: options.where,
                }).send(res);
            } catch (error) {
                this.logger.error(`Failed to list ${this.pluralizedName}`, {
                    error: error.message,
                });
                return fail(`Failed to list ${this.pluralizedName}`, error).send(res);
            }
        });

        const cap = (s) =>
            typeof s === 'string' && s.length ? s[0].toUpperCase() + s.slice(1) : s;

        router.get(`/:id`, async (req, res) => {
            try {
                const item = await this.service.getById(req.params.id);
                if (!item) {
                    this.logger.warn(
                        `${cap(this.singularizedName)} ID: ${req.params.id} not found`
                    );
                    return notFound(`${cap(this.singularizedName)} not found`).send(res);
                }
                return ok(item).send(res);
            } catch (error) {
                this.logger.error(`Failed to get ${this.singularizedName} ID: ${req.params.id}`, {
                    error: error.message,
                });
                return fail(`Failed to get ${this.singularizedName}`, error).send(res);
            }
        });

        router.post(`/`, async (req, res) => {
            try {
                const newItem = await this.service.create(req.body);
                return created(newItem).send(res);
            } catch (error) {
                this.logger.error(`Failed to create ${this.singularizedName}`, {
                    error: error.message,
                    stack: error.stack,
                    code: error.code,
                });
                return fail(`Failed to create ${this.singularizedName}`, error).send(res);
            }
        });

        router.put(`/:id`, async (req, res) => {
            try {
                const updatedItem = await this.service.update(req.params.id, req.body);
                if (!updatedItem) {
                    this.logger.warn(
                        `${this.singularizedName} ID: ${req.params.id} not found for update`
                    );
                    return notFound(`${this.singularizedName} not found`).send(res);
                }
                return ok(updatedItem).send(res);
            } catch (error) {
                this.logger.error(
                    `Failed to update ${this.singularizedName} ID: ${req.params.id}`,
                    {
                        error: error.message,
                        stack: error.stack,
                        code: error.code,
                    }
                );
                return fail(`Failed to update ${this.singularizedName}`, error).send(res);
            }
        });

        router.delete(`/:id`, async (req, res) => {
            try {
                const deleted = await this.service.delete(req.params.id);
                if (!deleted) {
                    this.logger.warn(
                        `${this.singularizedName} ID: ${req.params.id} not found for deletion`
                    );
                    return notFound(`${this.singularizedName} not found`).send(res);
                }
                return ok(true).send(res);
            } catch (error) {
                this.logger.error(
                    `Failed to delete ${this.singularizedName} ID: ${req.params.id}`,
                    {
                        error: error.message,
                        stack: error.stack,
                        code: error.code,
                    }
                );
                return fail(`Failed to delete ${this.singularizedName}`, error).send(res);
            }
        });

        app.use(this.basePath, router);
    }
}
