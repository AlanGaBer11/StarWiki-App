class RepositoryConfig {
  static getRepository(type) {
    const repositories = {
      authRepository: require("../repositories/implementations/authRepository.sequelize"),
      userRepository: require("../repositories/implementations/userRepository.sequelize"),
      categoryRepository: require("../repositories/implementations/categoryRepository.sequelize"),
      postRepository: require("../repositories/implementations/postRepository.sequelize"),
      commentRepository: require("../repositories/implementations/commentRepository.sequelize"),
    };

    return new repositories[type]();
  }
}

module.exports = RepositoryConfig;
