const express = require("express");
const verifySignUpMiddlewware = require("./../middleware/verifySignUp")
const authController = require("./../controllers/auth.controller");

const router = express.Router();

router.post('/signup', [
    verifySignUpMiddlewware.checkDuplicateUsernameOrEmail,
    verifySignUpMiddlewware.checkRolesExisted
] ,authController.signup);


router.post('/singin', authController.singin);



module.exports = router;