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
    const tempUser = [];
    for (let i = 1; i <= 5; i++) {
      tempUser.push({
        loginId: `test${i}`,
        password: `test${i}`,
        profile: 'https://hidden-track-bucket.s3.ap-northeast-2.amazonaws.com/profile/3621632329874169.png',
        nickName: `test${i}`,
        admin: 'listener',
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    return queryInterface.bulkInsert('users', tempUser);
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
