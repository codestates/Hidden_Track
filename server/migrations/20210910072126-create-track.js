'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tracks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING(50)
      },
      img: {
        type: Sequelize.STRING
      },
      genre: {
        type: Sequelize.STRING(20)
      },
      releaseAt: {
        type: Sequelize.STRING(20)
      },
      soundTrack: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER,
        references :{model: 'users', key: 'id'}
      },
      lyric: {
        type: Sequelize.TEXT
      },
      views: {
        type: Sequelize.INTEGER
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
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tracks');
  }
};