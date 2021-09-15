'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userArtist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.hasOne(models.user);
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
  return userArtist;
};