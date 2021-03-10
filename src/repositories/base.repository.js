class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async get(id) {
    return await this.model.findOne({ where: { id } });
  }

  async create(entity) {
    return await this.model.create(entity);
  }
}

module.exports = BaseRepository;
