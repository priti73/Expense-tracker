const Expense = require('../models/expense');
const User=require('../models/signup');
const mongoose = require('mongoose');

const Downloadedexpense=require('../models/downloadedexpense');
const expense = require('../models/expense');
const { DATE } = require('sequelize');
const Userservices=require('../services/userservices');
const S3services=require('../services/S3services');


// exports.postExpense=async (req,res,next)=>{
//    const session = await mongoose.startSession();
//    session.startTransaction();
//        try{
 
//        if(!req.body.expenseAmount || !req.body.description || !req.body.category){
//           throw new Error('Plz fill all the fields')
//        }
//      const amount=req.body.expenseAmount;
//      const description=req.body.description;
//      const category=req.body.category;
      
//        const data =await Expense.create({
//          expenseAmount:amount,
//          description:description,
//          category: category,
//          signupId:req.user._id
         
//       },{ session: session })
//          const totalexpense=Number(req.user.totalexpense)+Number(amount);
//          await User.findByIdAndUpdate(
//             req.user._id,
//             { totalexpense: totalexpense },
//             { session: session }
//           );
//           await session.commitTransaction();
//           session.endSession();
//           console.log('new expense');
//          res.status(201).json({newexpense:data});
//          }
//       catch(err){
//          await session.abortTransaction();
//          session.endSession();
//          console.error(err);
//          res.status(500).json({
        
//        })
//     }
//  }
exports.postExpense = async (req, res, next) => {
   const session = await mongoose.startSession();
   session.startTransaction();
   try {
     const { expenseAmount, description, category } = req.body;
 
     // Check if all required fields are present
     if (!expenseAmount || !description || !category) {
       throw new Error("Please fill all the fields");
     }
 
     const data = await Expense.create(
       [
         {
           expenseAmount,
           description,
           category,
           signupId: req.user._id,
         },
       ],
       { session }
     );
 
     const totalexpense = Number(req.user.totalexpense) + Number(expenseAmount);
     await User.findByIdAndUpdate(req.user._id, { totalexpense }, { session });
 
     await session.commitTransaction();
     session.endSession();
 
     console.log("new expense");
     res.status(201).json({ newexpense: data });
   } catch (err) {
     await session.abortTransaction();
     session.endSession();
     console.error(err);
     res.status(500).json({});
   }
 };
 
exports.deleteExpense = async (req, res, next) => {
  // const t= await sequelize.transaction();
  const session = await mongoose.startSession();
   session.startTransaction();
   try{
        const expenseid=req.params.id;
        console.log(expenseid)
        const expense=await Expense.findById(expenseid);
        console.log(expense)
        const user=await User.findById(expense.signupId);
        console.log(user)
        const totalexpense=(user.totalexpense)-(expense.expenseAmount);
        await User.findByIdAndUpdate(expense.signupId, { totalexpense: totalexpense }, { session });
    await Expense.findByIdAndRemove(expenseid, { session });
    await session.commitTransaction();
    session.endSession();
    res.status(201).json({ deleteexpenseid: expenseid });
   }
   
      catch(err){
         await session.abortTransaction();
        session.endSession();
         console.log(err);
          res.status(500).json({
             error: err
          })
       }
}

exports.getoneExpense = async (req, res, next) => {
   try{
        const expenseId=req.params.id;
        //const expense=await Expense.findByPk(expenseId);
        const expense=await Expense.findById(expenseId);
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
      const filename=`Expense${req.user.id}/${new DATE()}.txt`;
      const fileurl= await S3services.uploadToS3(stringifiedExpense,filename);
      
//       const file=await Downloadedexpense.create({
//          signupId:req.user.id,
//          fileurl:fileurl
//       })
//       res.status(200).json({fileurl,success:true})
//   }
  const downloadedExpense = new DownloadedExpense({
   signupId: req.user._id,
   fileUrl: fileurl
 });
 const savedExpense = await downloadedExpense.save();
 res.status(200).json({ fileUrl: savedExpense.fileUrl, success: true });
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

exports.getExpenses=async (req, res)=>{
   try{
       const page= +req.query.page || 1;
       let ITEM_PER_PAGE=+req.headers.rowperpage || 2;
  console.log(req.user._id)
        //const totalCount = await Expense.count({'userId':req.user.id});
        const totalCount = await Expense.countDocuments({'signupId':req.user._id});
  console.log(totalCount)
       
      //  const expenses=await Expense.findAll({
      //      where:{signupId:req.user.id},
      //      offset: (page-1)*ITEM_PER_PAGE,
      //      limit:ITEM_PER_PAGE
      //  })

       const expenses = await Expense.find({ signupId: req.user._id })
                              .skip((page - 1) * ITEM_PER_PAGE)
                              .limit(ITEM_PER_PAGE);
                              console.log(expenses)

       res.status(200).json({
           allExpenses: expenses, 
           premiumuser:req.user.ispremiumuser,
           currentPage:page,
           hasNextPage:ITEM_PER_PAGE*page<totalCount,
           nextPage:page+1,
           hasPreviousPage:page>1,
           previousPage:page-1,
           lastPage:Math.ceil(totalCount/ITEM_PER_PAGE)
       });
   }
   catch(err){
       console.log(err)
       res.status(500).json({
           error: err
       })
   }
};