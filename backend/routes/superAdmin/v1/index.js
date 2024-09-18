/**
 * index route file of client platform.
 * @description: exports all routes of client platform.
 */
const express = require('express');
const router = express.Router();

router.use('/superAdmin/auth', require('./auth'));
router.use('/superAdmin/user', require('./user'));
router.use('/superAdmin/hostel',require('./hostel'))

module.exports = router;
