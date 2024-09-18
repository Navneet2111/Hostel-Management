/**
 * userRoutes.js
 * @description :: CRUD API routes for user
 */

const express = require('express');
const router = express.Router();
const authController = require('../../../controller/superAdmin/v1/authController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/loginUser');

router.route('/login').post(authController.loginUser);
router.route('/logout').post(auth(PLATFORM.ADMIN), authController.logoutUser);

module.exports = router;
