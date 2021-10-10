'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('hashtags', [{
      tag: '우울한 노래',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tag: '우울',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tag: '우울함',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tag: '화남',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tag: '화나는 노래',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tag: '슬픈',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tag: '슬픈 노래',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tag: '슬픔',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tag: '이상적',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tag: '감정적',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tag: '조용함',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tag: '조용한 노래',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tag: '90년대',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tag: '80년대',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tag: '80년대 노래',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tag: '90년대 노래',
      createdAt: new Date(),
      updatedAt: new Date()
    },

    {
      tag: 'ㅁㄴㅇㅁㄴㅇㅁㄴㅇ',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tag: '우울함!!',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tag: 'test2',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tag: 'test1',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tag: '기대',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tag: '신비',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tag: '신비함',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tag: '신나는 노래',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tag: '신남',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tag: '심각함',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tag: '12344ㅇ',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tag: 'ㄴㅇㅀㄴㅇㅀㄴㅇㅀ',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tag: 'ㄴㅇㅀㄴㅇㅀ',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tag: 'ㅁㄴㅇㅁㄴㅇ',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      tag: '슬픔',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    ]);
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
