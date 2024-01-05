const express = require("express");
const router = express.Router();
const loginController = require("../controller/loginController");

// user login
router.post("/Login", loginController.Login);
// user registion
router.post("/Registion", loginController.Registion);
// user Update 
router.post("/UpdateUser", loginController.UpdateUser);
//user all
router.post("/readAllUser", loginController.readAllUser);


router.post("/readOneUser", loginController.readOneUser);

module.exports = router;
