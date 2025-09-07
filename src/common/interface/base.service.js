// Reusable base service for Sequelize models
export default class BaseService {
  constructor(model) {
    if (!model) throw new Error('BaseService requires a model');
    this.model = model;
  }

  async listAndCount(options = {}) {
    return this.model.findAndCountAll(options);
  }

  async count(options = {}) {
    return this.model.count(options);
  }

  async getById(id, options = {}) {
    return this.model.findByPk(id, options);
  }

  async create(data, options = {}) {
    return this.model.create(data, options);
  }

  async update(id, data, options = {}) {
    const item = await this.getById(id, options);
    if (!item) return null;
    return item.update(data, options);
  }

  async delete(id, options = {}) {
    const count = await this.model.destroy({ where: { id }, ...options });
    return count > 0;
  }
}
