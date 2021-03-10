const { Model } = require('sequelize');
const { compareSync, genSaltSync, hashSync } = require('bcrypt');

const { CoinTypes } = require('../common/');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      lastname: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      coin: {
        allowNull: false,
        defaultValue: CoinTypes[1],
        type: DataTypes.ENUM,
        values: CoinTypes,
      },
    },
    {
      sequelize,
      modelName: 'User',
    },
  );

  User.beforeSave((user) => {
    user.password = hashSync(user.password, genSaltSync(10));
  });

  User.prototype.toJSON = function () {
    let user = { ...this.get() };

    delete user.password;
    return user;
  };

  User.prototype.isValidPassword = function (password) {
    return compareSync(password, this.password);
  };

  return User;
};
