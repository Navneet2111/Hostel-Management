/**
 * authController.js
 * @description :: exports authentication methods
 */
const authService = require('../../../services/auth')
const { MESSAGE } = require('../../../constants/msgConstant')
const { user } = require('../../../model')
const dbService = require('../../../utils/dbService')

const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body
    if (!email || !password) {
      return res.badRequest({ message: MESSAGE.AUTH.LOGIN_BAD_REQ })
    }
    
    let result = await authService.loginUser(email, password)
   
    if (!result) {
      return res.failure({
        message: result.msg,
        data: null
      })
    }

    let { id, name,userRole, token } = result.data ;


return res.status(200).json({
  message:"Login Successful",
  data: { id, name,userRole, token }, 
  message: result.msg
});
  } catch (error) {
    console.error(error)
    return res.internalServerError({ message: error.message })
  }
}

const loginWithOTP = async (req, res) => {
  try {
    let { mobileNo, otp } = req.body
    if (!mobileNo || !otp) {
      return res.badRequest({ message: MESSAGE.AUTH.OTP_BAD_REQ })
    }
    let result = await authService.loginWithOtp(mobileNo, otp, req)
    if (result.flag) {
      return res.failure({
        message: result.msg,
        data: null
      })
    }
    return res.success({
      data: result.data,
      message: result.msg
    })
  } catch (error) {
    console.error(error)
    return res.internalServerError({ message: error.message })
  }
}

const resendOTP = async (req, res) => {
  try {
    let { mobileNo } = req.body
    if (!mobileNo) {
      return res.badRequest({ message: MESSAGE.AUTH.OTP_BAD_REQ })
    }
    let result = await authService.resendOTP(mobileNo)
    if (result.flag) {
      return res.failure({
        message: result.msg,
        data: null
      })
    }
    return res.success({
      data: result.data,
      message: result.msg
    })
  } catch (error) {
    console.error(error)
    return res.internalServerError({ message: error.message })
  }
}

const logoutUser = async (req, res) => {
  try {
    let result = await authService.logoutUser(req.user.id)
    if (result) {
      return res.success({})
    }
    return res.failure({})
  } catch (error) {
    console.error(error)
    return res.internalServerError({ message: error.message })
  }
}

module.exports = {
  loginUser,
  loginWithOTP,
  resendOTP,
  logoutUser
}
