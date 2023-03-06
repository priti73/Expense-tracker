const path = require('path');

const express = require('express');

const expenseController = require('../controllers/expense');
const auntheticateController=require('../middleware/auth');
const router = express.Router();

 router.post('/expense/add-expense', auntheticateController.authenticate,expenseController.postExpense);
 router.get('/expense/get-expense',auntheticateController.authenticate,expenseController.getExpenses);

 router.delete('/expense/delete-expense/:id',expenseController.deleteExpense);
 
 router.get('/expense/get-expense/:id',expenseController.getoneExpense);
 
router.get('/expense/download',auntheticateController.authenticate,expenseController.downloadfile);

module.exports = router;