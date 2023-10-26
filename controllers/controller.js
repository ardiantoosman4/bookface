const { Post, User, Tag, Profile, PostHasTag } = require("../models/index");
const formatDate = require("../helpers/formatDate");
const bcrypt = require("bcryptjs");
class Controller {
  static async landingPage(req, res) {
    try {
      let alertMsg = "";
      if (req.query.errMsg) {
        alertMsg = req.query.errMsg;
      }
      res.render("landingPage", { alertMsg });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async postLandingPage(req, res) {
    try {
      let { username, password } = req.body;
      let data = await User.findOne({
        where: { username },
      });
      if (data) {
        const isValidPassword = bcrypt.compareSync(password, data.password);
        if (isValidPassword) {
          req.session.userId = data.id;
          req.session.userId = data.id;
          res.redirect("/home");
        } else {
          let errMsg = "Invalid Username or Password!";
          res.redirect(`/?errMsg=${errMsg}`);
        }
      } else {
        let errMsg = "Invalid Username or Password!";
        res.redirect(`/?errMsg=${errMsg}`);
      }
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async register(req, res) {
    try {
      let alertMsg = [];
      if (req.query.errMsg) {
        alertMsg = req.query.errMsg.split(",");
      }
      res.render("register", { alertMsg });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async postRegister(req, res) {
    try {
      let { username, email, name, gender, password, confirmationPassword } =
        req.body;
      if (password) {
        if (password !== confirmationPassword) {
          let errMsg = "Password not match with Confirmation Password";
          res.redirect(`/register?errMsg=${errMsg}`);
        }
      }
      let createdUser = await User.create({
        username,
        email,
        password,
        role: "user",
      });
      await Profile.create({ UserId: createdUser.id, name, gender });
      res.redirect("/");
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        let errorMsg = [];
        error.errors.forEach((el) => {
          errorMsg.push(el.message);
        });
        res.redirect(`/register?errMsg=${errorMsg}`);
      } else {
        console.log(error);
        res.send(error);
      }
    }
  }
  static async logout(req, res) {
    try {
      req.session.destroy((err) => {
        if (err) {
          res.send(err);
        } else {
          res.redirect("/");
        }
      });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async home(req, res) {
    try {
      let queryTag = "";
      if (req.query.tag) {
        queryTag = req.query.tag;
      }
      let data = await Post.getPostsByTag(queryTag, Tag, User);
      let userProfile = await Profile.findOne({
        where: { UserId: req.session.userId },
      });
      let tagData = await Tag.findAll();
      res.render("home", { data, userProfile, formatDate, tagData });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async mypost(req, res) {
    try {
      let deleteMsg = "";
      if (req.query.deleteMsg) {
        deleteMsg = req.query.deleteMsg;
        deleteMsg = `Successfully delete post with title "${deleteMsg}"`;
      }

      let data = await Post.findAll({
        include: [Tag, User],
        where: { UserId: req.session.userId },
      });
      let userProfile = await Profile.findOne({
        where: { UserId: req.session.userId },
      });

      res.render("mypost", { data, deleteMsg, userProfile, formatDate });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async addPost(req, res) {
    try {
      let alertMsg = [];
      if (req.query.errMsg) {
        alertMsg = req.query.errMsg.split(",");
      }
      let tagData = await Tag.findAll();
      let userProfile = await Profile.findOne({
        where: { UserId: req.session.userId },
      });
      res.render("addPost", { userProfile, tagData, alertMsg });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async postAddPost(req, res) {
    try {
      let UserId = req.session.userId;
      let { title, content, TagId } = req.body;
      let imagePath = "";
      if (req.file) {
        imagePath = req.file.filename;
      }

      let createdPost = await Post.create({
        title,
        content,
        imagePath,
        UserId,
      });
      if (TagId) {
        await PostHasTag.bulkInsertPostHasTag(createdPost.id, TagId);
      }
      res.redirect("/mypost");
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        let errorMsg = [];
        error.errors.forEach((el) => {
          errorMsg.push(el.message);
        });
        res.redirect(`/mypost/add?errMsg=${errorMsg}`);
      } else {
        console.log(error);
        res.send(error);
      }
    }
  }
  static async deletePost(req, res) {
    try {
      let id = req.params.postId;
      let data = await Post.findOne({
        where: { id },
      });
      await Post.destroy({
        where: { id },
      });
      res.redirect(`/mypost?deleteMsg=${data.title}`);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async profile(req, res) {
    try {
      let alertMsg = "";
      if (req.query.errMsg) {
        alertMsg = req.query.errMsg;
      }
      let data = await Profile.findOne({
        where: { UserId: req.session.userId },
      });
      res.render("editProfile", { data, alertMsg });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async postProfile(req, res) {
    try {
      let UserId = req.session.userId;
      let { name, bio, gender } = req.body;
      let imagePath = "";
      if (req.file) {
        imagePath = req.file.filename;
      }
      await Profile.update(
        { name, bio, gender, imagePath },
        {
          where: { UserId },
          individualHooks: true,
        }
      );
      res.redirect("/profile");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}
module.exports = Controller;
