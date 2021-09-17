'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('hashtags', {
      userId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references :{model: 'users', key: 'id'},
      },
      postId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references :{model: 'posts', key: 'id'},
      },
      content: {
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
    await queryInterface.dropTable('hashtags');
  }
};