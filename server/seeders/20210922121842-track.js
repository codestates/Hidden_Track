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
    let track = [];
    for(let i=0;i<4;i++){
      const temp = {
        title : `trackTest${i}`,
        img : `img${i}`,
        genre : "jazz",
        releaseAt : "2020-08-01",
        soundTrack : `track${i}`,
        userId : i%5+1,
        lyric : "asdasd",
        views : 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      track.push(temp)
    }
    for(let i=4;i<8;i++){
      const temp = {
        title : `trackTest${i}`,
        img : `img${i}`,
        genre : "R&B",
        releaseAt : "2020-08-01",
        soundTrack : `track${i}`,
        userId : i%5+1,
        lyric : "asdasd",
        views : 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      track.push(temp)
    }
    for(let i=8;i<12;i++){
      const temp = {
        title : `trackTest${i}`,
        img : `img${i}`,
        genre : "ballad",
        releaseAt : "2020-08-01",
        soundTrack : `track${i}`,
        userId : i%5+1,
        lyric : "asdasd",
        views : 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      track.push(temp)
    }
    for(let i=12;i<16;i++){
      const temp = {
        title : `trackTest${i}`,
        img : `img${i}`,
        genre : "rock",
        releaseAt : "2020-08-01",
        soundTrack : `track${i}`,
        userId : i%5+1,
        lyric : "asdasd",
        views : 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      track.push(temp)
    }for(let i=16;i<20;i++){
      const temp = {
        title : `trackTest${i}`,
        img : `img${i}`,
        genre : "hiphop",
        releaseAt : "2020-08-01",
        soundTrack : `track${i}`,
        userId : i%5+1,
        lyric : "asdasd",
        views : 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      track.push(temp)
    }
     return queryInterface.bulkInsert("tracks",track);

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
