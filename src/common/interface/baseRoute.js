// Base CRUD routes with simple override option
// Usage:
//   baseRoute(router, service, 'Product')
//   baseRoute(router, service, 'Product', { list: (req,res)=>{...} })
const baseRoute = (router, service, entity, overrides = {}) => {
  const wrap = (fn) => async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };

  // Build Sequelize options from query params

  const handlers = {
    list: async (req, res) => {
      const options = buildOptions(req.query);
      const pageSize = options.limit ?? undefined;
      const offset = options.offset ?? 0;
      const page = pageSize ? Math.floor(offset / pageSize) + 1 : undefined;

      const { rows, count } = await service.listAndCount(options);
      res.json({
        data: rows,
        meta: {
          total: count,
          page,
          pageSize,
          offset,
          hasNext: pageSize ? offset + rows.length < count : false,
        },
      });
    },
    getById: async (req, res) => {
      const item = await service.getById(req.params.id);
      if (!item) return res.status(404).json({ message: `${entity} not found` });
      res.json({ data: item });
    },
    create: async (req, res) => {
      const created = await service.create(req.body);
      res.status(201).json({ data: created });
    },
    update: async (req, res) => {
      const updated = await service.update(req.params.id, req.body);
      if (!updated) return res.status(404).json({ message: `${entity} not found` });
      res.json({ data: updated });
    },
    delete: async (req, res) => {
      const deleted = await service.delete(req.params.id);
      if (!deleted) return res.status(404).json({ message: `${entity} not found` });
      res.status(200).json({ data: true });
    },
    ...overrides,
  };

  router.get('/', wrap(handlers.list));
  router.get('/:id', wrap(handlers.getById));
  router.post('/', wrap(handlers.create));
  router.put('/:id', wrap(handlers.update));
  router.delete('/:id', wrap(handlers.delete));

  return router;
};

export default baseRoute;
