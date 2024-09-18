/**
 * userRoutes.js
 * @description :: CRUD API routes for user
 */

const express = require('express');
const router = express.Router();
const hostelController = require('../../../controller/superAdmin/v1/hostelController');
const { PLATFORM } = require('../../../constants/authConstant');
const auth = require('../../../middleware/loginUser');

//Hostel CRUD
router.route('/create_hostel').post(auth(PLATFORM.SUPER_ADMIN),hostelController.createHostel);
router.route('/get_hostel/:id').get(auth(PLATFORM.SUPER_ADMIN),hostelController.get_hostel);
router.route('/update-hostel/:id').post(auth(PLATFORM.SUPER_ADMIN),hostelController.updateHostel);
router.route('/show_hostels').post(auth(PLATFORM.SUPER_ADMIN),hostelController.getHostels);
router.route('/delete_hostel/:id').post(auth(PLATFORM.SUPER_ADMIN),hostelController.deleteHostel);
router.route('/deactivate/:id').put(auth(PLATFORM.SUPER_ADMIN),hostelController.deActiveHostel);

router.route('/allAdmin').post(auth(PLATFORM.SUPER_ADMIN),hostelController.findAllAdmin)
router.route('/hostelAdmin/:id').get(auth(PLATFORM.SUPER_ADMIN),hostelController.oneAdmin)
router.route('/deleteAdmin/:id').put(auth(PLATFORM.SUPER_ADMIN),hostelController.removeAdmin);
 
module.exports = router;
 