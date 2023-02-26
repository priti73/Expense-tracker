const Sequelize=require('sequelize');

const sequelize=require('../util/database');

const Downloadedexpense=sequelize.define('downloadedexpense',{
  id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  fileurl:Sequelize.STRING
});

module.exports =Downloadedexpense;