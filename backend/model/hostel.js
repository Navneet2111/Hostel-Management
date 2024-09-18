const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnection");
const sequelizePaginate = require("sequelize-paginate");
const sequelizeTransforms = require("sequelize-transforms");
const { reusableModelAttribute } = require("../utils/common");

let Hostel = sequelize.define(
  "hostel",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    hostelOperator:{
      type: DataTypes.INTEGER, 
      allowNull: false,
    },
    name: { 
      type: DataTypes.STRING,
      allowNull: false, 
    },  
    fullAddress: {
      type: DataTypes.STRING,
    },
    about: {
      type: DataTypes.STRING,
    },
    totalBeds: {
      type: DataTypes.INTEGER,
      defaultValue:0
      
    },
    occupiedBeds: {
      type: DataTypes.INTEGER,
      defaultValue:0,
    },
    remainingBeds: {
      type: DataTypes.INTEGER, 
      
    },
    ...reusableModelAttribute,
  },
  {
    timestamps: true,
    freezeTableName: true, 
  }
);
 

Hostel.addHook("beforeSave", async (hostel, options) => {
  
  hostel.remainingBeds = hostel.totalBeds - hostel.occupiedBeds;
});

Hostel.addHook("afterCreate", (hostel, options) => {
  hostel.update({ isActive: true });
});

sequelizeTransforms(Hostel);
sequelizePaginate.paginate(Hostel);
module.exports = Hostel;
