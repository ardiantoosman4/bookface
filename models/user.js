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
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            args: true,
            msg: "Email must be in email format",
          },
          isNotNullEmpty(value) {
            if (!value) {
              throw new Error("email is required");
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
          minLen(value) {
            if (value.length < 8) {
              throw new Error("Password length must be 8 or above");
            }
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
