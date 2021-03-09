class BaseService {
  constructor(repository) {
    this.repository = repository;
  }

  async create(entity) {
    return await this.repository.create(entity);
  }
}

module.exports = BaseService;
