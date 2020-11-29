const router = require("express").Router();
const userController = require("../controller/user");

router.post("/login", userController.login);
router.post("/register", userController.register);
router.post("/setLevel", userController.setLevel);

module.exports = router;
