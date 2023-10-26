const express = require("express");
const Controller = require("../controllers/controller");
const router = express.Router();

router.get("/", Controller.mypost);
router.post("/add", Controller.addPost);
router.get("/:postId/delete", Controller.deletePost);

module.exports = router;
