'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('userArtists', {
      userId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references :{model: 'users', key: 'id'},
      },
        agency: {
          type: Sequelize.STRING(20)
        },
        email: {
          type: Sequelize.STRING(30)
        },
        debut: {
          type: Sequelize.STRING(20)
        }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('userArtists');
  }
};