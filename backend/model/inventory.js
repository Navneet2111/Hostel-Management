const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnection");
const sequelizePaginate = require("sequelize-paginate");
const sequelizeTransforms = require("sequelize-transforms");
const { reusableModelAttribute } = require("../utils/common");

let Inventory = sequelize.define(
  "inventory",
  {
    hostelid: {
      type: DataTypes.INTEGER,
    },
   itemName:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    quantity: { 
      type: DataTypes.INTEGER,
      allowNull: false, 
    },  
    about: {
      type: DataTypes.STRING,
    },
    ...reusableModelAttribute
    
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);
 

sequelizeTransforms(Inventory);
sequelizePaginate.paginate(Inventory);
module.exports = Inventory;
