const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const expenseSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  expenseAmount: {
    type: Number,
    required: true
  },
  signupId: {
    type: Schema.Types.ObjectId,
    ref: 'signup'
  }
});


module.exports=mongoose.model('expense',expenseSchema);


// const Sequelize=require('sequelize');

// const sequelize=require('../util/database');

// const Expense=sequelize.define('expense',{
//   id:{
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//    description:{
//     type: Sequelize.STRING,
//     allowNull:false
    
//         },
//    category:{
//     type:Sequelize.STRING,
//     allowNull:false
//       },
//     expenseAmount:{
//     type: Sequelize.INTEGER,
//     allowNull:false
//    }
// });

// module.exports =Expense;