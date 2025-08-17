class RepositoryConfig {
  static getRepository(type) {
    const repositories = {};

    return new RepositoryConfig[type]();
  }
}

module.exports = RepositoryConfig;
