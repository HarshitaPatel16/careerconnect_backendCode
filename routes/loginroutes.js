const express = require("express");
const router = express.Router();
const loginController = require("../controller/loginController");
const forgetValidation = require("../validation");
const { sendEmail } = require('../sendmail'); // Import the sendEmail function


// user login
router.post("/Login", loginController.Login);
// user registion
router.post("/Registion", loginController.Registion);
// user Update 
router.post("/UpdateUser", loginController.UpdateUser);
//user all
router.post("/readAllUser", loginController.readAllUser);


router.post("/readOneUser", loginController.readOneUser);

console.log('Reached userRouter forgetPassword route');


router.post("/forgetPassword", loginController.forgetPassword);

console.log('Reached forgetPassword controller');


module.exports = router;
