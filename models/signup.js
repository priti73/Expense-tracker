const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const userSchema=new Schema({
         email:{
            type: String,
            required:true,
            unique:true
            },
           password:{
            type: String,
            required:true
        },
           name:{
            type: String,
            required:true
           },
           ispremiumuser:{
            type:Boolean,
            default: false 
        },
           totalexpense:{
             type:Number,
             default:0
           },
           expenses: [{
            type: Schema.Types.ObjectId,
            ref: 'expense'
          }]   
           
})
module.exports=mongoose.model('signup',userSchema);



// const Sequelize=require('sequelize');

// const sequelize=require('../util/database');

// const User=sequelize.define('signup',{
//   id:{
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//    email:{
//     type: Sequelize.STRING,
//     allowNull:false,
//     unique:true
//     },
//    password:{
//     type:Sequelize.STRING,
//     allowNull:false
//       },
//    name:{
//     type: Sequelize.STRING,
//     allowNull:false
//    },
//    ispremiumuser:Sequelize.BOOLEAN,
//    totalexpense:{
//      type:Sequelize.INTEGER,
//      defaultValue:0
//    }
// });

// module.exports =User;