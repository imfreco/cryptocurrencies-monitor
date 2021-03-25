const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCoin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserCoin.init(
    {
      userId: { allowNull: false, primaryKey: true, type: DataTypes.INTEGER },
      coinId: { allowNull: false, primaryKey: true, type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: 'UserCoin',
    },
  );
  return UserCoin;
};
