'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class players extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  players.init({
    name: DataTypes.STRING,
    jersey: DataTypes.INTEGER,
    position: DataTypes.STRING,
    team: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'players',
  });
  return players;
};