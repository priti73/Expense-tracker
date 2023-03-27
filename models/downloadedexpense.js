// const Sequelize=require('sequelize');

// const sequelize=require('../util/database');

// const Downloadedexpense=sequelize.define('downloadedexpense',{
//   id:{
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   fileurl:Sequelize.STRING
// });

// module.exports =Downloadedexpense;

const mongoose = require('mongoose');

const downloadedExpenseSchema = new mongoose.Schema({
  signupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'signup',
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  }
});

const DownloadedExpense = mongoose.model('DownloadedExpense', downloadedExpenseSchema);

module.exports = DownloadedExpense;
