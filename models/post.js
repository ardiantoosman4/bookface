"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User);
      Post.belongsToMany(models.Tag, { through: "PostHasTag" });
    }
    static async getPostsByTag(queryTag,Tag,User) {
      let data = [];
      let dataPost = await Post.findAll({
        include: [{ model: Tag }, User],
      });
      if (queryTag) {
        dataPost.forEach((el) => {
          let tags = el.Tags;
          for (const tag of tags) {
            if (tag.name === queryTag) {
              data.push(el);
              break;
            }
          }
        });
      } else {
        data = dataPost;
      }
      return data;
    }
  }
  Post.init(
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      imagePath: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
      isBlocked: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
