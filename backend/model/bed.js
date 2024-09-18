const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConnection");
const sequelizePaginate = require("sequelize-paginate");
const sequelizeTransforms = require("sequelize-transforms");
const { v4: uuidv4 } = require('uuid');
const hostels = require('./hostel')

let Bed = sequelize.define(
  "bed",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, 
    },
    bedName: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      allowNull: false,
    },
    about: {
      type: DataTypes.STRING,
    },
    isAssigned:{
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Providing a default value for isAssigned
    }, 
    hostelId:{
      type: DataTypes.INTEGER,
      references :{
          model:hostels,
          key:"id" 
      }
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);
 
Bed.addHook("afterCreate", (bed, options) => {
  bed.update({ isAssigned: false });
});

sequelizeTransforms(Bed);
sequelizePaginate.paginate(Bed);
module.exports = Bed;
