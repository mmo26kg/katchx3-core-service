// Base CRUD routes with simple override option
// Usage:
//   baseRoute(router, service, 'Product')
//   baseRoute(router, service, 'Product', { list: (req,res)=>{...} })

import buildOptions from '../helper/buildOptions.js';
import ApiResponse, { ok, created, fail } from '../helper/api.response.js';

const baseRoute = (router, service, entityName, overrides = {}) => {
    const wrap = (fn) => async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (err) {
            next(err);
        }
    };

    const handlers = {
        listAndCount: async (req, res) => {
            const options = buildOptions(req.query);
            const pageSize = options.limit ?? undefined;
            const offset = options.offset ?? 0;
            const page = pageSize ? Math.floor(offset / pageSize) + 1 : undefined;

            const { rows, count } = await service.listAndCount(options);
            return ok(rows, {
                total: count,
                page,
                pageSize,
                offset,
                hasNext: pageSize ? offset + rows.length < count : false,
            }).send(res);
        },
        count: async (req, res) => {
            const options = buildOptions(req.query);
            const count = await service.count(options);
            return ok({ count }).send(res);
        },

        getById: async (req, res) => {
            const item = await service.getById(req.params.id);
            if (!item) return fail(`${entityName} not found`).withStatus(404).send(res);
            return ok(item).send(res);
        },
        create: async (req, res) => {
            const created = await service.create(req.body);
            return ApiResponse.created(created).send(res);
        },
        update: async (req, res) => {
            const updated = await service.update(req.params.id, req.body);
            if (!updated) return fail(`${entityName} not found`).withStatus(404).send(res);
            return ok(updated).send(res);
        },
        delete: async (req, res) => {
            const deleted = await service.delete(req.params.id);
            if (!deleted) return fail(`${entityName} not found`).withStatus(404).send(res);
            return ok(true).withStatus(200).send(res);
        },
        ...overrides,
    };

    router.get('/', wrap(handlers.listAndCount));
    router.get('/count', wrap(handlers.count));
    router.get('/:id', wrap(handlers.getById));
    router.post('/', wrap(handlers.create));
    router.put('/:id', wrap(handlers.update));
    router.delete('/:id', wrap(handlers.delete));

    return router;
};

export default baseRoute;
