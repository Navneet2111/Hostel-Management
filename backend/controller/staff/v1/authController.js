/**
 * authController.js
 * @description :: exports authentication methods
 */
const authService = require('../../../services/auth');
const authConstant = require('../../../constants/authConstant');
const { MESSAGE } = require('../../../constants/msgConstant');
const dbService = require('../../../utils/dbService');
const userCredentials = require('../../../model/user');

/**
 * @description : login with email and password
 * @param {Object} req : request for login 
 * @param {Object} res : response for login
 * @return {Object} : response for login {status, message, data}
 */
const loginUser = async (req, res) => {
  try {
    let {
      mobileNo, password 
    } = req.body;
    if (!mobileNo || !password) {
      return res.badRequest({ message: MESSAGE.AUTH.LOGIN_BAD_REQ });
    }
    let result = await authService.loginUser(mobileNo, password );
    if (result.flag) {
      return res.failure({
        message: result.msg,
        data: null 
      });
    }
    return res.success({
      data: result.data,
      message: result.msg
    });
  } catch (error) {
    console.error(error);
    return res.internalServerError({ message: error.message });
  }
};

const loginWithOTP = async (req, res) => {
  try {
    let {
      mobileNo, otp 
    } = req.body;
    if (!mobileNo || !otp) {
      return res.badRequest({ message: MESSAGE.AUTH.OTP_BAD_REQ });
    }
    let result = await authService.loginWithOtp(mobileNo, otp );
    if (result.flag) {
      return res.failure({
        message: result.msg,
        data: null 
      });
    }
    return res.success({
      data: result.data,
      message: result.msg
    });
  } catch (error) {
    console.error(error);
    return res.internalServerError({ message: error.message });
  }
};

const resendOTP = async (req, res) => {
  try {
    let { mobileNo } = req.body;
    if (!mobileNo) {
      return res.badRequest({ message: MESSAGE.AUTH.OTP_BAD_REQ });
    }
    let result = await authService.resendOTP(mobileNo);
    if (result.flag) {
      return res.failure({
        message: result.msg,
        data: null 
      });
    }
    return res.success({
      data: result.data,
      message: result.msg
    });
  } catch (error) {
    console.error(error);
    return res.internalServerError({ message: error.message });
  }
};
module.exports = {
  loginUser ,
  loginWithOTP,
  resendOTP 
};
