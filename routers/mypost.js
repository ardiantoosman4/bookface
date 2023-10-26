const express = require("express");
const Controller = require("../controllers/controller");
const router = express.Router();
const upload = require("../middlewares/fileUpload");

router.get("/", Controller.mypost);
router.get("/add", Controller.addPost);
router.post("/add", upload.single("imagePath"), Controller.postAddPost);
router.get("/:postId/delete", Controller.deletePost);

module.exports = router;
