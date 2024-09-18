/**
 * userRoutes.js
 * @description :: CRUD API routes for user
 */

const express = require('express');
const router = express.Router();
const staffController = require('../../../controller/admin/v1/staffController');
const { PLATFORM } = require('../../../constants/authConstant');
const auth = require('../../../middleware/loginUser');

router.route('/add-staff').post(auth(PLATFORM.ADMIN), staffController.addStaff); 
router.route('/remove-staff/:id').delete(auth(PLATFORM.ADMIN), staffController.removeStaffFromHostel);  
router.route('/edit-staff/:id').post(auth(PLATFORM.ADMIN),staffController.updateStaffDetails);
router.route('/allStaffs').post(auth(PLATFORM.ADMIN),staffController.findAllStaffs) 
router.route('/getstaff/:id' ).get(auth(PLATFORM.ADMIN),staffController.getStaff);  

module.exports = router; 
