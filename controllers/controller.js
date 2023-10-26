const { Post, User, Tag, Profile } = require("../models/index");
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
        where: { username, password },
      });
      if (data) {
        req.session.userId = data.id;
        res.redirect("home");
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
      let { username, name, gender, password, confirmationPassword } = req.body;
      if (password) {
        if (password !== confirmationPassword) {
          let errMsg = "Password not match with Confirmation Password";
          res.redirect(`/register?errMsg=${errMsg}`);
        }
      }
      let createdUser = await User.create({ username, password, role: "user" });
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
    //" form buat search by tag dan menampilkan semua post";
    try {
      let data = await Post.findAll({ include: [Tag, User] });
      res.render("home", { data });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async mypost(req, res) {
    try {
      let data = await Post.findAll({
        include: [Tag, User],
        where: { UserId: req.session.userId },
      });
      res.render("mypost", { data });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async addPost(req, res) {
    try {
      res.send("menambahkan post dan redirect ke mypost");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async deletePost(req, res) {
    try {
      let id = req.params.postId;
      await Post.destroy({
        where: { id },
      });
      res.redirect("/mypost");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async profile(req, res) {
    try {
      res.send("menampilkan form edit profile");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async postProfile(req, res) {
    try {
      res.send("mengubah profile");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}
module.exports = Controller;
