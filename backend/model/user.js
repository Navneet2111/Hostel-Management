/**
 * user.js
 * @description :: sequelize model of database table user
 */
const { DataTypes ,Sequelize }= require("sequelize");
const sequelize = require("../config/dbConnection");
const sequelizePaginate = require("sequelize-paginate");
const sequelizeTransforms = require("sequelize-transforms");
const { reusableModelAttribute } = require("../utils/common");
const authConstantEnum = require("../constants/authConstant");
const bcrypt = require("bcrypt");
function convertObjectToEnum(obj) {
  return Object.values(obj);
}

const validateroleName = (value) => {
  const allowedValues = ['SUPER_ADMIN', 'ADMIN', 'STAFF'];
  if (!allowedValues.includes(value)) {
    throw new Sequelize.ValidationError('Invalid roleName value. Accepted values are SUPER_ADMIN, ADMIN, and STAFF.');
  }
};

let User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: { type: DataTypes.STRING, allowNull: false },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobileNo: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING },
    userRole: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isIn: [convertObjectToEnum(authConstantEnum.PLATFORM)], // Validate against enum values
      },
    },
    roleName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        custom: validateroleName,
      },

    }, 
    fullAddress: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING },
    state: { type: DataTypes.STRING },
    zipcode: { type: DataTypes.STRING },
    country: { type: DataTypes.STRING },
    about: { type: DataTypes.STRING },
    ...reusableModelAttribute,
  },
  {
    freezeTableName: true,
    hooks: {
      beforeCreate: [
        
        async function (user,options){
          if(user.password){
          user.password = await bcrypt.hash(user.password, 8);
          }
          user.isActive = user.isActive?.toString() === "false" ? false : true;
          user.isDeleted = false;
        },
      ],
      beforeBulkCreate: [
        async function (user, options) {
          if (user !== undefined && user.length) {
            for (let userIndex of user) {
              const element = userIndex;
              element.isActive = true;
              element.isDeleted = false;
            }
          }
        },
      ],
      beforeUpdate: [
        async function (disposition) {
          disposition.updatedAt = new Date();
        },
      ],
    },
  }
);
User.prototype.isPasswordMatch = async function (password) {
  const userCredentials = this;
  return bcrypt.compare(password, userCredentials.password);
};
User.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  delete values.password;
  return values;
};
sequelizeTransforms(User);
sequelizePaginate.paginate(User);
module.exports = User;
