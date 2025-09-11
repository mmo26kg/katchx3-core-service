const buildOptions = (q = {}) => {
    const opts = {};

    // attributes (fields=name,price)
    if (typeof q.fields === 'string' && q.fields.trim()) {
        opts.attributes = q.fields
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean);
    }

    // sorting (sort=name,-createdAt)
    const sort = q.sort || q.order;
    if (typeof sort === 'string' && sort.trim()) {
        opts.order = sort
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean)
            .map((key) => (key.startsWith('-') ? [key.slice(1), 'DESC'] : [key, 'ASC']));
    }

    // pagination
    const toInt = (v) => {
        const n = parseInt(v, 10);
        return Number.isFinite(n) && n >= 0 ? n : undefined;
    };
    const page = toInt(q.page);
    const pageSize = toInt(q.pageSize);
    const limit = toInt(q.limit);
    const offset = toInt(q.offset);

    if (page !== undefined && pageSize !== undefined) {
        opts.limit = pageSize;
        opts.offset = page > 0 ? (page - 1) * pageSize : 0;
    } else {
        if (limit !== undefined) opts.limit = limit;
        if (offset !== undefined) opts.offset = offset;
    }

    // simple where filters from remaining keys
    const reserved = new Set(['fields', 'sort', 'order', 'page', 'pageSize', 'limit', 'offset']);
    const where = {};
    for (const [k, v] of Object.entries(q)) {
        if (reserved.has(k)) continue;
        if (v === undefined || v === null || v === '') continue;
        where[k] = v;
    }
    if (Object.keys(where).length) opts.where = where;

    return opts;
};
export default buildOptions;
