const Sequelize=require('sequelize');
// const sequelize=new Sequelize('node-complete','root','PFH#23kgrw9',{
//     dialect: 'mysql',
//     host: 'localhost'
// });
const sequelize=new Sequelize('expense','root','PFH#23kgrw9',{
    dialect: 'mysql',
    host: 'localhost'
});
module.exports=sequelize;
