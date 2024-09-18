/**
 * authController.js
 * @description :: exports authentication methods
 */
const authService = require('../../../services/auth')
const authConstant = require('../../../constants/authConstant')
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
    console.log("login");
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
const myaccount = async (req, res) => {
  try {
    const user = req.user
    await updateLogin(req, user)
    const io = req.io
    let newList = await dbService.findOne(app_constants, {}, { order: [['createdAt', 'DESC']] })
    newList = newList.get({ plain: true })
    setTimeout(() => {
      io.emit('call-updated', newList?.calls || 0)
    }, 5000)
    return res.success({
      data: user,
      message: ''
    })
  } catch (error) {
    console.error(error)
    return res.internalServerError({ message: error.message })
  }
}

const updateToken = async (req, res) => {
  try {
    const userDetails = req.user
    let { tokenId } = req.body
    if (user.tokenId !== tokenId) {
      await dbService.update(user, { id: userDetails.id }, { tokenId })
      return res.success({})
    }
    return res.success({})
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
  myaccount,
  updateToken,
  logoutUser
}
