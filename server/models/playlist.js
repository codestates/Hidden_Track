'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      this.belongsTo(models.user);
      this.belongsTo(models.track);
    }
  }
  playlist.init({
    userId: DataTypes.INTEGER,
    trackId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'playlist'
  });
  return playlist;
};
