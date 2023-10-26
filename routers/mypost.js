const express = require("express");
const Controller = require("../controllers/controller");
const router = express.Router();

router.get("/", Controller.mypost);
router.get("/add", Controller.addPost);
router.post("/add", Controller.postAddPost);
router.get("/:postId/delete", Controller.deletePost);

module.exports = router;
