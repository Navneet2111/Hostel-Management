/**
 * loginUser.js
 * @description :: middleware that verifies user's JWT token
 */

const jwt = require("jsonwebtoken");
const { PLATFORM } = require("../constants/authConstant");
const { JWT } = require("../constants/authConstant");

/**
 * @description : middleware for authenticate user with JWT token
 * @param {obj} req : request of route.
 * @param {obj} res : response of route.
 * @param {callback} next : executes the next middleware succeeding the current middleware.
 */
const authenticateJWT = (platform) => (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const token = authHeader;
  let secret = "";
  if (platform === PLATFORM.ADMIN) {
    secret = JWT.ADMIN_SECRET;
  } else if (platform === PLATFORM.SUPER_ADMIN) {
    secret = JWT.SUPER_ADMIN_SECRET;
  } else {
    secret = JWT.STAFF_SECRET;
  }
  jwt.verify(token, secret, (error, user) => {
    if (error) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateJWT;
