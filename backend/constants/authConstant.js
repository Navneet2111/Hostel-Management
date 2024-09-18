/**
 * authConstant.js
 * @description :: constants used in authentication
 */

const JWT = {
  SUPER_ADMIN_SECRET: 'myjwtadminsecret',
  ADMIN_SECRET: 'bhiugioperatorsecret',
  STAFF_SECRET: 'hfhfghmastersecret',
  EXPIRES_IN: 1440,
  OTP_EXPIRES_IN: 120 ,
};

const USER_TYPES = {
  SUPER_ADMIN: 1,
  ADMIN: 2,
  STAFF: 3,
};

const PLATFORM = {
  SUPER_ADMIN: 1,
  ADMIN: 2,
  STAFF: 3,
};

let LOGIN_ACCESS = {
  [USER_TYPES.ADMIN]: [PLATFORM.ADMIN],
  [USER_TYPES.SUPER_ADMIN]: [PLATFORM.SUPER_ADMIN],
  [USER_TYPES.STAFF]: [PLATFORM.STAFF],
};

const MAX_LOGIN_RETRY_LIMIT = 3;
const MAX_RESEND_OTP_RETRY_LIMIT = 3;
const MAX_LOGIN_OTP_RETRY_LIMIT = 3;
const LOGIN_REACTIVE_TIME = 20;
const OTP_REACTIVE_TIME = 1;

const FORGOT_PASSWORD_WITH = {
  LINK: {
    email: true,
    sms: false,
  },
  EXPIRE_TIME: 20,
};


module.exports = {
  JWT,
  USER_TYPES,
  PLATFORM,
  MAX_LOGIN_RETRY_LIMIT,
  LOGIN_REACTIVE_TIME,
  FORGOT_PASSWORD_WITH,
  LOGIN_ACCESS,
  OTP_REACTIVE_TIME,
  MAX_RESEND_OTP_RETRY_LIMIT,
  MAX_LOGIN_OTP_RETRY_LIMIT,
 
};
