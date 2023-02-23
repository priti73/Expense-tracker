const Expense = require('../models/expense');
const User=require('../models/signup');
const sequelize = require('../util/database');

exports.postExpense=async (req,res,next)=>{
   
   const t= await sequelize.transaction();
    try{
 
       if(!req.body.expenseAmount || !req.body.description || !req.body.category){
          throw new Error('Plz fill all the fields')
       }
     const amount=req.body.expenseAmount;
     const description=req.body.description;
     const category=req.body.category;
      
       const data =await Expense.create({
         expenseAmount:amount,
         description:description,
         category: category,
         signupId:req.user.id
         
      },{transaction :t})
         const totalexpense=Number(req.user.totalexpense)+Number(amount);
        await User.update({
            totalexpense:totalexpense
         },{
            where:{ id: req.user.id},
            transaction :t
         })
         await t.commit();
         console.log('new expense');
         res.status(201).json({newexpense:data});
       
      }
      
    catch(err){
      await t.rollback();
       res.status(500).json({
          error: err
       })
    }
 }

 
exports.getAllExpense = async (req, res, next) => {
   try{
        const expenses=await Expense.findAll({where:{signupid:req.user.id}});
        console.log('get user');
        res.status(201).json({allexpenses: expenses});
      }
   
   catch(err){
      res.status(500).json({
         error: err
   })
 }
}

exports.deleteExpense = async (req, res, next) => {
   const t= await sequelize.transaction();
   try{
        const expenseid=req.params.id;
        const expense=await Expense.findByPk(expenseid);
        console.log(expense.signupId);
        const user=await User.findByPk(expense.signupId);
        console.log(user.email);
        console.log(user.totalexpense);
        const totalexpense=(user.totalexpense)-(expense.expenseAmount);
        console.log(expense.expenseAmount);
        console.log(totalexpense);
        await User.update({
            totalexpense:totalexpense
         },{
            where:{ id: expense.signupId},
            transaction :t
         })
          await t.commit();
         console.log('delete user');
         await Expense.destroy({where: {id: expenseid}});
         res.status(201).json({deleteexpenseid:expenseid});
      }
   
      catch(err){
         await t.rollback();
         console.log(err);
          res.status(500).json({
             error: err
          })
       }
}

exports.getoneExpense = async (req, res, next) => {
   try{
         const expenseId=req.params.id;
        const expense=await Expense.findByPk(expenseId);
        console.log('getedit user');
        res.status(201).json({editexpenseid: expense});
      }
   
   catch(err){
      res.status(500).json({
         error: err
   })
 }
}