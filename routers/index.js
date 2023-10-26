const express = require("express");
const Controller = require("../controllers/controller");
const { isLogin } = require("../middlewares/auth");
const router = express.Router();
const mypost = require("./mypost");
const profile = require("./profile");

router.get("/", Controller.landingPage);
router.post("/", Controller.postLandingPage);
router.get("/register", Controller.register);
router.post("/register", Controller.postRegister);

// LOGIN FIRST
router.use(isLogin);
router.get("/logout", Controller.logout);
router.get("/home", Controller.home);

router.use("/mypost", mypost);
router.use("/profile", profile);

module.exports = router;
