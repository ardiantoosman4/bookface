const express = require("express");
const Controller = require("../controllers/controller");
const router = express.Router();
const upload = require("../middlewares/fileUpload");

router.get("/", Controller.profile);
router.post("/", upload.single("imagePath"), Controller.postProfile);

module.exports = router;
