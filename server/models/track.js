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
    static associate (models) {
      // define association here
      this.belongsTo(models.user);
      this.hasMany(models.playlist);
      this.hasMany(models.reply);
      this.belongsToMany(models.user, {
        through: 'likes',
        foreignKey: 'trackId'
      });
      this.belongsToMany(models.user, {
        through: 'grades'
      });
      this.belongsToMany(models.hashtag, {
        through: 'tagtracks',
        foreignKey: 'trackId',
        otherKey: 'hashtagId'
      });
    }
  }
  track.init({
    title: DataTypes.STRING,
    img: DataTypes.STRING,
    genre: DataTypes.STRING,
    releaseAt: DataTypes.STRING,
    soundTrack: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    lyric: DataTypes.TEXT,
    views: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'track'
  });
  return track;
};
