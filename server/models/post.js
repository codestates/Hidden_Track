'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user);
      this.hasMany(models.reply);
      //this.hasOne(models.track);
      this.belongsToMany(models.user, {
        through: "likes",
        foreignKey: "postId",
      });
      this.belongsToMany(models.user, {
        through: "grades"
      });
      this.belongsToMany(models.user, {
        through: "hashtags"
      });
    }
  };
  post.init({
    userId: DataTypes.INTEGER,
    viwes: DataTypes.INTEGER,
    gradeAev: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};