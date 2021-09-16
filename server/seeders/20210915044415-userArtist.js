'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     return queryInterface.bulkInsert("userArtists", [
      {
        userId : 1,
        agency : "test1",
        email :  "test1@gmail.com",
        debut : "2020-08-18"
      },{
        userId : 2,
        agency : "test2",
        email :  "test2@gmail.com",
        debut : "2020-08-18"
      }
    ])
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
