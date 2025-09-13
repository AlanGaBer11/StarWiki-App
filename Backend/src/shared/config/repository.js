class RepositoryConfig {
  static getRepository(type) {
    const repositories = {
      authRepository: require("@/shared/repositories/implementations/authRepository.sequelize"),
      userRepository: require("@/shared/repositories/implementations/userRepository.sequelize"),
      categoryRepository: require("@/shared/repositories/implementations/categoryRepository.sequelize"),
      postRepository: require("@/shared/repositories/implementations/postRepository.sequelize"),
      commentRepository: require("@/shared/repositories/implementations/commentRepository.sequelize"),
    };

    return new repositories[type]();
  }
}

module.exports = RepositoryConfig;
