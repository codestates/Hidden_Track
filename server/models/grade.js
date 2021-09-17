'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class grade extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  grade.init({
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    userGrade: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'grade',
  });

  grade.removeAttribute('id');
  return grade;
};