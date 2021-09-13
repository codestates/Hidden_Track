'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //this.hasOne(models.userArtist)
      this.hasMany(models.post);
      this.hasMany(models.reply);
      this.hasMany(models.track);
      this.hasMany(models.playlist);
      this.belongsToMany(models.post, {
        through: "likes",
        foreignKey: "userId",
      });
      this.belongsToMany(models.post, {
        through: "grades"
      });
      this.belongsToMany(models.post, {
        through: "hashtags"
      });
    }
  };
  user.init({
    loginId: DataTypes.STRING,
    password: DataTypes.STRING,
    profile: DataTypes.STRING,
    nickName: DataTypes.STRING,
    RT: DataTypes.TEXT,
    admin: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};