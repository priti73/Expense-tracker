const path = require('path');
const fs=require('fs');

const express = require('express');
const bodyParser = require('body-parser');
//const helmet = require("helmet");
//const compresion=require("compression");
//const morgan=require("morgan");


//const errorController = require('./controllers/error');
const sequelize=require('./util/database');
const User=require('./models/signup');
const Expense=require('./models/expense');
const Order=require('./models/orders');
const Forgotpassword= require('./models/forgotpassword');
const downloadedexpense=require('./models/downloadedexpense');


var cors =require('cors');

const app = express();

app.use(cors());


app.set('view engine', 'ejs');
app.set('views', 'views');

const usersrouteRoutes = require('./routes/signup');
const loginRoutes = require('./routes/login');
const expenseRoutes=require('./routes/expense');
const purchaseRoutes=require('./routes/purchase');
const premiumRoutes=require('./routes/premium');
const passwordRoutes=require('./routes/password');

// const accessLogStream=fs.createWriteStream(
//     path.join(__dirname,'access.log'),{flags: 'a'}
// );

// app.use(helmet());
// app.use(compresion());
// app.use(morgan('combined',{stream:accessLogStream}));



app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(usersrouteRoutes);
app.use(loginRoutes);
app.use(expenseRoutes);
app.use(purchaseRoutes);
app.use(premiumRoutes);
app.use(passwordRoutes);
//app.use(errorController.get404);

User.hasMany(Expense);
Expense.belongsTo(User);
User.hasMany(Order);
Order.belongsTo(User);
User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);
User.hasMany(downloadedexpense);
downloadedexpense.belongsTo(User);


sequelize
.sync()
//.sync({force: true})
.then(result=>{
   app.listen(process.env.PORT|| 3000);
})
.catch(err=>{
    console.log(err);
}); 





