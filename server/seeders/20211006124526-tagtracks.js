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
    const tags = [];
    for (let i = 1; i <= 5; i++) {
      tags.push({
        trackId: Math.floor((Math.random() * 100) % 20 + 1),
        hashtagId: 30,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    // console.log(tags);
    return queryInterface.bulkInsert('tagtracks', tags);
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
