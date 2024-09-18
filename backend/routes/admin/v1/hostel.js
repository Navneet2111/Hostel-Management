/**
 * userRoutes.js
 * @description :: CRUD API routes for user
 */

const express = require('express');
const router = express.Router();
const hostelController = require('../../../controller/admin/v1/hostelController');
const hostelControllerS = require('../../../controller/superAdmin/v1/hostelController');
const { PLATFORM } = require('../../../constants/authConstant');
const auth = require('../../../middleware/loginUser');


router.route('/show_hostels').post(auth(PLATFORM.ADMIN),hostelController.getHostels);
router.route('/update/:id').put(auth(PLATFORM.ADMIN),hostelController.updateHostel);

module.exports = router; 
 