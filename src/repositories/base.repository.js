class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async create(entity) {
    return await this.model.create(entity);
  }
}

module.exports = BaseRepository;
