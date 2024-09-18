/**
 * userRoutes.js
 * @description :: CRUD API routes for user
 */

const express = require('express');
const router = express.Router();
const authController = require('../../../controller/staff/v1/authController');

router.route('/login').post(authController.loginUser);
router.route('/login_with_otp').post(authController.loginWithOTP);
router.route('/resend_otp').post(authController.resendOTP);

module.exports = router;
