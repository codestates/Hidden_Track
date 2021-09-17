'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('grades', {
      userId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references :{model: 'users', key: 'id'}
      },
      postId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references :{model: 'posts', key: 'id'}
      },
      userGrade: {
        type: Sequelize.FLOAT
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
    await queryInterface.dropTable('grades');
  }
};