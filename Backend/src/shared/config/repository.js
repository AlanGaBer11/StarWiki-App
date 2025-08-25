class RepositoryConfig {
  static getRepository(type) {
    const repositories = {
      user: require("../repositories/implementations/userRepository.sequelize"),
    };

    return new repositories[type]();
  }
}

module.exports = RepositoryConfig;
