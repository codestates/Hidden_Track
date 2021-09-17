'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class track extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //this.hasOne(models.post);
      this.belongsTo(models.user);
      this.hasMany(models.playlist);
    }
  };
  track.init({
    title: DataTypes.STRING,
    img: DataTypes.STRING,
    genre: DataTypes.STRING,
    releaseAt: DataTypes.STRING,
    soundTrack: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    lyric: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'track',
  });
  return track;
};