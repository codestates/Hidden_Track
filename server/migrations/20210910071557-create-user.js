'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      loginId: {
        type: Sequelize.STRING(30)
      },
      password: {
        type: Sequelize.STRING(20)
      },
      profile: {
        type: Sequelize.STRING(100)
      },
      nickName: {
        type: Sequelize.STRING(20)
      },
      RT: {
        type: Sequelize.TEXT
      },
      admin: {
        type: Sequelize.STRING(20)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
