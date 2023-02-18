const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

//const errorController = require('./controllers/error');
const sequelize=require('./util/database');
var cors =require('cors');

const app = express();

app.use(cors());

app.set('view engine', 'ejs');
app.set('views', 'views');

const usersrouteRoutes = require('./routes/users');
const loginRoutes = require('./routes/login');


app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(usersrouteRoutes);
app.use(loginRoutes);
//app.use(errorController.get404);

sequelize
.sync()
//.sync({force: true})
.then(result=>{
   app.listen(3000);
})
.catch(err=>{
    console.log(err);
}); 





