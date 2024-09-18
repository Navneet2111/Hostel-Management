/**
 * userRoutes.js
 * @description :: CRUD API routes for user
 */

const express = require('express');
const router = express.Router();
const authController = require('../../../controller/Superadmin/v1/userController');
const { PLATFORM } = require('../../../constants/authConstant');
const auth = require('../../../middleware/loginUser');

router.route('/create').post(auth(PLATFORM.SUPER_ADMIN),authController.registerUser);
router.route('/list').get(auth(PLATFORM.SUPER_ADMIN), authController.findAllUser);
router.route('/partial-update/:id').put(auth(PLATFORM.SUPER_ADMIN), authController.partialUpdateUser);
router.route('/:id').get(auth(PLATFORM.SUPER_ADMIN), authController.getUser);
router.route('/:id').delete(auth(PLATFORM.SUPER_ADMIN), authController.deleteUser);
router.route('/reset-password/:id').put(auth(PLATFORM.SUPER_ADMIN), authController.resetPassword);
router.route('/logoff/:id').put(auth(PLATFORM.SUPER_ADMIN), authController.logOffUser);
router.route('/login/:id').get(auth(PLATFORM.SUPER_ADMIN), authController.loginToAccount);

module.exports = router;
