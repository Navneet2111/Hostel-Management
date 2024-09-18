/**
 * auth.js
 * @description :: service functions used in authentication
 */

const model = require("../model/index");
const dbService = require("../utils/dbService");
const {
  JWT,
  USER_TYPES,
  MAX_LOGIN_RETRY_LIMIT,
  LOGIN_REACTIVE_TIME,
  MAX_RESEND_OTP_RETRY_LIMIT,
  MAX_LOGIN_OTP_RETRY_LIMIT,
} = require("../constants/authConstant");
const jwt = require("jsonwebtoken");
const common = require("../utils/common");
const dayjs = require("dayjs");
const bcrypt = require("bcrypt");
const ejs = require("ejs");
const uuid = require("uuid").v4;
const otpGenerator = require("otp-generator");
const moment = require("moment");
const Hostel = require("../model/hostel");

/**
 * @description : service to generate JWT token for authentication.
 * @param {obj} user : user who wants to login.
 * @param {string} secret : secret for JWT.
 * @return {string}  : returns JWT token.
 */
const generateToken = async (user, secret) => {
 
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email:user.email,
      userRole:user.userRole
    },
    secret,
    
  );
};

/**
 * @description : service of login user.
 * @param {string} username : username of user.
 * @param {string} password : password of user.
 * @param {string} platform : platform.
 * @return {obj} : returns authentication status. {flag, data}
 */
const loginUser = async (email, password) => {
  try {
    let where = { $or: [{ email: email }, { mobileNo: email }] };
  
    const user = await dbService.findOne(model.user, where);

   
    if (!user) {
      return {
        flag: true,
        msg: "User not exists",
      };
    }

    if (user.userRole === USER_TYPES.STAFF) {
      return {
        flag: true,
        msg: "Unauthorized",
      };
    }

    const userCredentials = await dbService.findOne(model.user, {
      id: user.id,
    });
  
    if (password) {
      let isPasswordMatched = await user.isPasswordMatch(password);
      if (!isPasswordMatched) {
        return {
          msg: "Invalid credentials", 
        };
      }
    } else {
      return {
        msg: "Missing password", 
      };
    }

    const userData = user.toJSON();
    if (!userCredentials.userRole) {
      return {
        flag: true,
        msg: "You have not been assigned any role",
      };
    }

    let token;
    if (userCredentials.userRole == 1) {
      var roles = {
        id: userCredentials.userRole,
        name: "SuperAdmin",
        role: "SUPER_ADMIN",
      };
      token = await generateToken(userData, JWT.SUPER_ADMIN_SECRET);
    } else if (userCredentials.userRole == 2) {
      var roles = {
        id: userCredentials.userRole,
        name: "Admin",
        role: "ADMIN",
      };
      token = await generateToken(userData, JWT.ADMIN_SECRET);
    } else if (userCredentials.userRole == 3) {
      var roles = {
        id: userCredentials.userRole,
        name: "Staff",
        role: "STAFF",
      };
      token = await generateToken(userData, JWT.STAFF_SECRET);
    }

    let userToReturn = {
      ...userData,
      token,
    };
    return {
      data: userToReturn,
    };
  } catch (error) {
    throw new Error(error.message);
  } 
};

const loginWithOtp = async (mobileNo, otp, req) => {
  try {
    let where = { $or: [{ email: mobileNo }, { mobileNo: mobileNo }] };
    let options = {};
    options.include = [
      {
        model: model.user,
        as: "_userId",
        required: true,
      },
    ];
    const user = await dbService.findOne(model.userCredentials, where, options);
    if (!user) {
      return {
        flag: true,
        msg: "User not exists",
      };
    }
    const userCredentials = await dbService.findOne(model.user, {
      id: user.userId,
    });
    let userAuth = await dbService.findOne(model.userAuthSettings, {
      userId: user.userId,
    });
    if (
      userAuth &&
      userAuth.loginResendOTPRetryLimit >= MAX_LOGIN_OTP_RETRY_LIMIT
    ) {
      await dbService.update(
        model.userCredentials,
        { userId: user.userId },
        { isActive: false }
      );
      return {
        flag: true,
        msg: `you have exceed the number of limit`,
      };
    } else if (userAuth.loginResendOTPRetryLimit < MAX_LOGIN_OTP_RETRY_LIMIT) {
      let now = dayjs();
      let otpTime = dayjs(userAuth.otpExpiredTime);

      if (now >= otpTime) {
        return {
          flag: true,
          msg: "OTP Expired!",
        };
      }

      if (otp != userAuth.otp) {
        await dbService.update(
          model.userAuthSettings,
          { userId: user.userId },
          { loginResendOTPRetryLimit: userAuth.loginResendOTPRetryLimit + 1 }
        );
        return {
          flag: true,
          msg: "Incorrect OTP!",
          otp: otp,
        };
      }

      await dbService.update(
        model.user,
        { id: user.userId },
        { loggedOff: false }
      );

      await dbService.update(
        model.userAuthSettings,
        { userId: user.userId },
        {
          otpExpiredTime: now,
          twoFAResendOTPRetryLimit: 0,
          loginRetryLimit: 0,
          loginReactiveTime: null,
          loginResendOTPRetryLimit: 0,
        }
      );
      const userData = user.toJSON();
      let token;

      if (userCredentials.userRole == 1) {
        var roles = {
          id: userCredentials.userRole,
          name: "admin",
          role: "ADMIN",
        };
        token = await generateToken(userData, JWT.ADMIN_SECRET);
      } else if (userCredentials.userRole == 2) {
        var roles = {
          id: userCredentials.userRole,
          name: "operator",
          role: "OPERATOR",
        };
        token = await generateToken(userData, JWT.OPERATOR_SECRET);
      } else if (userCredentials.userRole == 3) {
        var roles = {
          id: userCredentials.userRole,
          name: "user",
          role: "USER",
        };
        token = await generateToken(userData, JWT.USER_SECRET);
      }

      userToReturn = {
        ...userData,
        roles,
        token,
      };

      const userDetail = await dbService.findOne(model.user, {
        id: user.userId,
      });
      await trackLogin(req, userDetail);

      return {
        flag: false,
        msg: msg,
        data: userToReturn,
      };
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const resendOTP = async (mobileNo) => {
  try {
    let where = { $or: [{ email: mobileNo }, { mobileNo: mobileNo }] };
    const user = await dbService.findOne(model.userCredentials, where);
    if (!user) {
      return {
        flag: true,
        msg: "User not exists",
      };
    }
    let userAuth = await dbService.findOne(model.userAuthSettings, {
      userId: user.userId,
    });
    if (
      userAuth &&
      userAuth.twoFAResendOTPRetryLimit >= MAX_RESEND_OTP_RETRY_LIMIT
    ) {
      await dbService.update(
        model.userCredentials,
        { userId: user.userId },
        { isActive: false }
      );
      return {
        flag: true,
        msg: `you have exceed the number of limit`,
      };
    } else {
      await dbService.update(
        model.userAuthSettings,
        { userId: user.userId },
        { twoFAResendOTPRetryLimit: userAuth.twoFAResendOTPRetryLimit + 1 }
      );
      const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
      });
      msg = `Your WHVS login otp is ${otp}`;
      let expire = dayjs().add(JWT.OTP_EXPIRES_IN, "second").toISOString();
      await dbService.update(
        model.userAuthSettings,
        { userId: user.userId },
        {
          otp: otp,
          otpExpiredTime: expire,
        }
      );

      const email = user.otpEmail ? user.otpEmail : user.email;
      const mobile = user.otpMobile ? user.otpMobile : user.mobileNo;

      msg = `Your OTP for Login to ${email} is ${otp}. It is valid for ${JWT.OTP_EXPIRES_IN} seconds.`;
      await sendEmailForOtp(email, msg);
      if (mobile) {
        await sendTextMessage(mobile, msg);
      }
      return {
        flag: false,
        msg: msg,
        data: user,
      };
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const logoutUser = async (id) => {
  try {
    const date = moment.utc();
    const options = {
      order: [["createdAt", "DESC"]],
    };
    const lastActivity = await dbService.findOne(
      model.userActivity,
      { userId: id },
      options
    );
    await dbService.update(
      model.user,
      { id },
      { lastActivityTime: date, loggedOff: true }
    );
    if (lastActivity) {
      await dbService.update(
        model.userActivity,
        { id: lastActivity.id },
        { lastActivityTime: date, isLogout: true }
      );
    }
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = {
  loginUser,
  loginWithOtp,
  resendOTP,
  generateToken,
  logoutUser,
};
