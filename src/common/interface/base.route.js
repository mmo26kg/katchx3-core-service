import container from '../helper/di-container.js';
import { ok, fail, notFound, created } from '../helper/api.response.js';
import buildOptions from '../helper/buildOptions.js';

export default class BaseController {
    constructor(serviceName, moduleConfig) {
        this.logger = container.get('logger');
        this.service = container.get(serviceName);
        this.basePath = moduleConfig.basePath;
        this.singularizedName = moduleConfig.singularizedName;
        this.pluralizedName = moduleConfig.pluralizedName;
    }

    attachRoutes(app) {
        app.get(this.basePath, async (req, res) => {
            try {
                const options = buildOptions(req.query);
                const result = await this.service.listAndCount(options);
                return ok(result).send(res);
            } catch (error) {
                this.logger.error(`Failed to list ${this.pluralizedName}`, {
                    error: error.message,
                });
                return fail(`Failed to list ${this.pluralizedName}`, error).send(res);
            }
        });

        app.get(`${this.basePath}/:id`, async (req, res) => {
            try {
                const item = await this.service.getById(req.params.id);
                if (!item) {
                    this.logger.warn(
                        `${this.singularizedName.capitalize()} ID: ${req.params.id} not found`
                    );
                    return notFound(`${this.singularizedName.capitalize()} not found`).send(res);
                }
                return ok(item).send(res);
            } catch (error) {
                this.logger.error(`Failed to get ${this.singularizedName} ID: ${req.params.id}`, {
                    error: error.message,
                });
                return fail(`Failed to get ${this.singularizedName}`, error).send(res);
            }
        });

        app.post(this.basePath, async (req, res) => {
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

        app.put(`${this.basePath}/:id`, async (req, res) => {
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

        app.delete(`${this.basePath}/:id`, async (req, res) => {
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
    }
}
