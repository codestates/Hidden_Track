'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class hashtag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      this.belongsToMany(models.track, {
        through: 'tagtracks',
        foreignKey: 'hashtagId',
        otherKey: 'trackId'
      });
    }
  }
  hashtag.init({
    tag: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'hashtag'
  });
  return hashtag;
};
