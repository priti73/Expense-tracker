const Sequelize=require('sequelize');

const sequelize=require('../util/database');

const User=sequelize.define('signup',{
  id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
   email:{
    type: Sequelize.STRING,
    allowNull:false,
    unique:true
    },
   password:{
    type:Sequelize.STRING,
    allowNull:false
      },
   name:{
    type: Sequelize.STRING,
    allowNull:false
   },
   ispremiumuser:Sequelize.BOOLEAN
});

module.exports =User;