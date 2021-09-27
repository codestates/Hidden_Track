'use strict';
const {
  Model
} = require('sequelize');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class userArtist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  userArtist.init({
    userId: DataTypes.INTEGER,
    agency: DataTypes.STRING,
    email: DataTypes.STRING,
    debut: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'userArtist',
  });
  userArtist.removeAttribute('id');
  return userArtist;
};