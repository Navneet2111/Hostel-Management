/**
 * userRoutes.js
 * @description :: CRUD API routes for user
 */

const express = require('express');
const router = express.Router();
const hostelController = require('../../../controller/admin/v1/hostelController');
const { PLATFORM } = require('../../../constants/authConstant');
const auth = require('../../../middleware/loginUser');


//Hostel and Staf CRUD for Operator

router.route('/hostelinfo').post(auth(PLATFORM.ADMIN), hostelController.Hostel_info); 
router.route('/update/:id').put(auth(PLATFORM.ADMIN),hostelController.updateHostel);

module.exports = router; 
 