/**
 * index.js
 * @description :: index route of platforms
 */

const express = require("express");
const router = express.Router();
// const rateLimit = require("express-rate-limit");
// const rateLimiter = rateLimit({
//   windowMs: 20 * 60 * 1000,
//   max: 10,
//   message: "Rate limit exceeded, please try again after 20 minutes",
//   skip: (req) => {
//     if (req.url.includes("/swagger") || req.url.includes("/favicon")) {
//       return true;
//     } else {
//       return false;
//     }
//   },
// });



router.use(require("./staff/v1/index"));
router.use(require("./superAdmin/v1/index"));
router.use(require("./admin/v1/index"));

module.exports = router;
