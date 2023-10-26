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
    get formatedName() {
      if (this.gender === "male") {
        return `Mr. ${this.name}`;
      } else {
        return `Mrs. ${this.name}`;
      }
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
  Profile.addHook("beforeUpdate", (instance, options) => {
    if (instance.imagePath) {
      instance.imagePath = `/images/${instance.imagePath}`;
    } else {
      instance.imagePath = "";
    }
  });
  return Profile;
};
