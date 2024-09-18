/**
 * index.js
 * @description :: exports all the models and its relationships among other models
 */

const dbConnection = require('../config/dbConnection');
const db = {};
db.sequelize = dbConnection;

db.user = require('./user');
db.hostel = require('./hostel')
db.staff =require('./staff')
db.inventory =require('./inventory')
db.bed = require('./bed')

db.inventory.belongsTo(db.hostel);



module.exports = db;
