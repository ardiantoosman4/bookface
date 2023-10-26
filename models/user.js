"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile);
      User.hasMany(models.Post);
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        validate: {
          isNotNullEmpty(value) {
            if (!value) {
              throw new Error("Username is required");
            }
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          isNotNullEmpty(value) {
            if (!value) {
              throw new Error("Password is required");
            }
          },
          len: {
            args: [5, 20],
            msg: "Password length must between 5 and 20",
          },
        },
      },
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
