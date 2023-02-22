const User=require('../models/signup');
const Expense=require('../models/expense');
const sequelize=require('../util/database');

exports.getUserLeaderBoard=async(req,res)=>{
    try{
      const userleaderboarddetails=await User.findAll({
         attributes:['id', 'name',[sequelize.fn('sum',sequelize.col('expenses.expenseAmount')),'total_expense']],
         include:[{
            model:Expense,
            attributes:[]
         }],
         group:['signup.id'],
         order:[['total_expense','DESC']]
         
      })
      //  const users=await User.findAll();
      //  const expenses= await Expense.findAll();
      //  const userAggregateExpense={}
      //  expenses.forEach(expense => {
      //    if(userAggregateExpense[expense.signupId]){
      //       userAggregateExpense[expense.signupId]= userAggregateExpense[expense.signupId]  +expense.expenseAmount
      //    }
      //    else{
      //       userAggregateExpense[expense.signupId]=expense.expenseAmount
      //    }
      //  });
      //  var userleaderboarddetails=[];
      //  users.forEach((user)=>{
      //   userleaderboarddetails.push({name:user.name,total_expense:userAggregateExpense[user.id] || 0})
      //  })
       
      //  console.log(userleaderboarddetails);
      //  userleaderboarddetails.sort((a,b)=>
      //    b.total_expense - a.total_expense
      //  );
      //  console.log(userleaderboarddetails);
       res.status(200).json(userleaderboarddetails)

    }
    catch (err){
        console.log(err);
        res.status(500).json(err)

    }
}