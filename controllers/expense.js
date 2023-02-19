const Expense = require('../models/expense');

exports.postExpense=async (req,res,next)=>{
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
         category: category
      });
      console.log('new expense');
      res.status(201).json({newexpense:data});
    }
    catch(err){
       res.status(500).json({
          error: err
       })
    }
 }

 
exports.getAllExpense = async (req, res, next) => {
   try{
        const expenses=await Expense.findAll();
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
   try{
        const expenseid=req.params.id;
        await Expense.destroy({where: {id: expenseid}});
        console.log('delete user');
        res.status(201).json({deleteexpenseid:expenseid});
      }
   
   catch(err){
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