const { Post, User, Tag, Profile } = require("../models/index");
class Controller {
  static async landingPage(req, res) {
    try {
      res.render("landingPage");
      console.log(data);
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async postLandingPage(req, res) {
    try {
      res.redirect("home");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async register(req, res) {
    try {
      res.send("Ini REGISTER page");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async postRegister(req, res) {
    try {
      res.redirect("/");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async logout(req, res) {
    try {
      res.redirect("/");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async home(req, res) {
    try {
      let data = await Post.findAll({ include: Tag });
      console.log(data);
      res.send(" form buat search by tag dan menampilkan semua post");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async mypost(req, res) {
    try {
      res.send(
        "menampilkan form membuat post dan semua post dari user yg login"
      );
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
      res.send("delete post dan redirect ke mypost");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async profile(req, res) {
    try {
      res.redirect("menampilkan form edit profile");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
  static async postProfile(req, res) {
    try {
      res.redirect("mengubah profile");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}
module.exports = Controller;
