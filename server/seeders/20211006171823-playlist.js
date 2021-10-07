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
     let playlist = [];
     for(let i =1;i<=5;i++){
       playlist.push({
         userId : Math.floor((Math.random()*100)%5+1),
         trackId : Math.floor((Math.random()*100)%20+1),
         createdAt: new Date(),
         updatedAt: new Date(),
       })
     } 
     
      return queryInterface.bulkInsert("playlists",playlist);
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
