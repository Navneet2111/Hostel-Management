/**
 * index route file of client platform.
 * @description: exports all routes of client platform.
 */
const express =  require('express');
const router = express.Router();

router.use('/staff/auth', require('./auth'));

module.exports = router;
