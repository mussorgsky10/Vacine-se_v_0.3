'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sortition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Sortition.belongsTo(models.Reward);
    }
  };
  Sortition.init({
    cracha_sorteado: DataTypes.STRING,
    itemId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Sortition',
  });
  return Sortition;
};