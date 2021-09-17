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
     let tempPost = [];
     for(let i =1;i<=10;i++){
      tempPost.push({
        userId : 1,
        views: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
     }
     
     return queryInterface.bulkInsert("posts",tempPost);
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
