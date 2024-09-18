/**
 * index route file of client platform.
 * @description: exports all routes of client platform.
 */
const express = require('express');
const router = express.Router();

router.use('/admin/auth', require('./auth'));
router.use('/admin/user', require('./user'));
router.use('/admin/hostel',require('./hostel'))

module.exports = router;
