"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PostHasTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    static async bulkInsertPostHasTag(PostId,TagIds){
      for (const TagId of TagIds) {
        await PostHasTag.create({ PostId ,TagId});
        
      }
    }
  }
  PostHasTag.init(
    {
      PostId: DataTypes.INTEGER,
      TagId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "PostHasTag",
    }
  );
  return PostHasTag;
};
