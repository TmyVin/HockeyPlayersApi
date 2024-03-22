'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Players extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Players.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    position: DataTypes.STRING,
    team: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Players',
  });
  return Players;
};