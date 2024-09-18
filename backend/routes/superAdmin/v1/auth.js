/**
 * userRoutes.js
 * @description :: CRUD API routes for user
 */

const express = require('express');
const router = express.Router();
const authController = require('../../../controller/Superadmin/v1/authController');
const auth = require('../../../middleware/loginUser');
const { PLATFORM } =  require('../../../constants/authConstant'); 

router.route('/login').post(authController.loginUser);
router.route('/login_with_otp').post(authController.loginWithOTP);
router.route('/resend_otp').post(authController.resendOTP);
router.route('/logout').post(auth(PLATFORM.SUPER_ADMIN), authController.logoutUser);

module.exports = router;
