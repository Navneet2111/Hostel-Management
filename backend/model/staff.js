/**
 * user.js
 * @description :: sequelize model of database table user
 */
const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnection");
const sequelizePaginate = require("sequelize-paginate");
const sequelizeTransforms = require("sequelize-transforms");
const { reusableModelAttribute } = require("../utils/common");




let Staff = sequelize.define(
  "staff",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: DataTypes.STRING,
    allowNull:false },
    userRole: {
      type: DataTypes.STRING
    },
    fullAddress: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING },
    state: { type: DataTypes.STRING },
    zipcode: { type: DataTypes.STRING },
    country: { type: DataTypes.STRING },
    about: { type: DataTypes.STRING },
    contactNo: { type: DataTypes.BIGINT, allowNull: false },
    hostelName:{type :DataTypes.STRING},
    hostelId: { type: DataTypes.INTEGER },
    ...reusableModelAttribute,
  },
  {
    freezeTableName: true,
    
  }
);

// Define the afterCreate hook to set isActive to true
Staff.addHook("afterCreate", (staff, options) => {
  staff.update({ isActive: true });
});


sequelizeTransforms(Staff);
sequelizePaginate.paginate(Staff);
module.exports = Staff;
