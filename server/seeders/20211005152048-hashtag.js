'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("hashtags",[{
      tag :'우울한 노래',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      tag :'우울',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      tag :'우울함',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
