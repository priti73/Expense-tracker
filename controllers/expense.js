const Expense = require('../models/expense');
const User=require('../models/signup');
const sequelize = require('../util/database');
const Downloadedexpense=require('../models/downloadedexpense');
const { DATE } = require('sequelize');
const Userservices=require('../services/userservices');
const S3services=require('../services/S3services');


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
         // const {page =1, limit=10}=req.query;
         // console.log(req.query.page);
         // console.log(req.query.limit);

        const expenses=await Expense.findAll({where:{signupid:req.user.id}})
        
        console.log('get user');
        res.status(201).json({allexpenses: expenses.length, expenses});
      }
   
   catch(err){
      console.log(err);
      res.status(500).json({
         error: err
   })
 }
}

exports.getexpenses=(req,res,next)=>{
 const page =+req.query.page || 1;
 let totalexpenses;
 const ITEMS_PER_PAGE=10;
 Expense.count().then((total)=>{
   totalexpenses=total;
   return Expense.findAll({
   offset: (page - 1)*ITEMS_PER_PAGE,
   limit: ITEMS_PER_PAGE,
   });

 })
 .then((expenses)=>{
   res.json({
      expenses:expenses,
      currentPage:page,
      hasNextPage:ITEMS_PER_PAGE *page < totalexpenses,
      nextPage: page+1,
      hasPreviousPage:page > 1,
      previousPage: page-1,
      lastPage: Math.ceil(totalexpenses/ ITEMS_PER_PAGE),
      })
 })
 .catch((err)=>console.log(err));
}

exports.getexpense=(req,res)=>{
   try{
       const id=req.user.id;
       //console.log(parseInt(req.query.limit));
       const limit=req.query.limit? parseInt(req.query.limit):2;
       const page=req.query.page ? parseInt(req.query.page) : 1;
       console.log(parseInt(req.query.page));
       console.log("priti",req.user.id);
       Expense.findAndCountAll({where :{ signupId:id}}).then((data)=>{
         var pages=Math.ceil(data.count /limit);
         console.log('page',pages);
         req.user.getExpenses({offset :(page-1)*limit, limit: limit})
         .then((expense)=>{
           // console.log(expense,"expense created");
            res.json({expense,pages:pages});
         })
         .catch((err)=>{
            console.log(err);
         })
         .catch((err)=>{
            console.log(err);
         })
       })
   }
   catch(err){
      console.log(err);
      return res.status(500).json({error :err, success: false});
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


exports.downloadfile=async (req,res)=>{
   try{
       
   const ispremiumuser=req.user.ispremiumuser;
   const expense=await Userservices.getExpenses(req);
  if(ispremiumuser){
   const stringifiedExpense=JSON.stringify(expense);
   console.log(stringifiedExpense);
      const filename=`Expense${req.user.id}/${new DATE()}.txt`;
      const fileurl= await S3services.uploadToS3(stringifiedExpense,filename);
     const file=await Downloadedexpense.create({
         signupId:req.user.id,
         fileurl:fileurl
      })
      res.status(200).json({fileurl,success:true})
  }
  else{
     res.status(404).json({message:'you are not a premium user'})
  }
   
  }
   catch(err){
           console.log(err);
           res.status(500).json(err);
   }
}