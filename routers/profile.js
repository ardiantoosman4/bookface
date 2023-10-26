const express = require("express");
const Controller = require("../controllers/controller");
const router = express.Router();

router.get("/", Controller.profile);
router.post("/", Controller.postProfile);

module.exports = router;
