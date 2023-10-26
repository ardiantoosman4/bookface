class Controller {
  static async landingPage(req, res) {
    try {
      res.send("Ini landing page");
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
}
module.exports = Controller;
