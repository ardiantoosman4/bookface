"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User);
    }
  }
  Profile.init(
    {
      UserId: DataTypes.INTEGER,
      name: {
        type: DataTypes.STRING,
        validate: {
          isNotNullEmpty(value) {
            if (!value) {
              throw new Error("Name is required");
            }
          },
        },
      },
      imagePath: DataTypes.STRING,
      bio: DataTypes.STRING,
      gender: {
        type: DataTypes.STRING,
        validate: {
          isNotNullEmpty(value) {
            if (!value) {
              throw new Error("Gender is required");
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Profile",
    }
  );
  return Profile;
};
