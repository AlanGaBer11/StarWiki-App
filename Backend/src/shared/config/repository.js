class RepositoryConfig {
  static getRepository(type) {
    const repositories = {
      user: require("@/shared/repositories/implementations/userRepository.sequelize"),
      category: require("@/shared/repositories/implementations/categoryRepository.sequelize"),
    };

    return new repositories[type]();
  }
}

module.exports = RepositoryConfig;
