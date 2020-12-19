'use strict';
const { Model } = require('sequelize');
const { bcrypt } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Wishlist, { foreignKey: 'userId' });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'nama tidak boleh kosong',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'email tidak boleh kosong',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'password tidak boleh kosong',
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'alamat tidak boleh kosong',
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate: (instance, options) => {
          return bcrypt(instance.password).then((bcrypt) => {
            instance.password = bcrypt;
          });
        },
      },
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
