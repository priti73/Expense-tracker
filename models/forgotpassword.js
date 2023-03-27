// const Sequelize= require('sequelize');

// const sequelize=require('../util/database');

// const forgotpassword=sequelize.define('forgotpassword',{
//    id:{
//     type: Sequelize.UUID,
//     allowNull: false,
//     primaryKey: true
//   },
//   active: Sequelize.BOOLEAN,
//   signupId:Sequelize.INTEGER
// });

// module.exports =forgotpassword;

const mongoose=require('mongoose');

//const uuid = require('mongoose-uuid2');

const Schema=mongoose.Schema;

const forgotpasswordSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
    required: true,
    unique: true
  },
  active:{
    type:Boolean,
    default: false 
},
  signupId: {
    type: Schema.Types.ObjectId,
    ref: 'signup'
  }
});


module.exports=mongoose.model('forgotpassword',forgotpasswordSchema);