'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references :{model: 'users', key: 'id'},
      },
      views: {
        type: Sequelize.INTEGER
      },
      gradeAev: {
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
    }).then(
      await queryInterface.createTable('grades', {
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
        grade: {
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
      }),
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
      })
    )
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('posts');
  }
};