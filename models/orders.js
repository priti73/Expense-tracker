// const Sequelize=require('sequelize');

// const sequelize=require('../util/database');

// const Order=sequelize.define('order',{
//   id:{
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   paymentid:Sequelize.STRING,
//   orderid: Sequelize.STRING,
//   status:Sequelize.STRING
// });

// module.exports =Order;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  paymentid: { type: String, required: true },
  orderid: { type: String, required: true },
  status: { type: String, required: true },

signupId: {
  type: Schema.Types.ObjectId,
  ref: 'signup'
}

});


module.exports=mongoose.model('order',orderSchema);
