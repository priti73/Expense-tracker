const path = require('path');

const express = require('express');

const expenseController = require('../controllers/expense');

const router = express.Router();

 router.post('/expense/add-expense',expenseController.postExpense);
 router.get('/expense/get-expense',expenseController.getAllExpense);

 router.delete('/expense/delete-expense/:id',expenseController.deleteExpense);
 
 router.get('/expense/get-expense/:id',expenseController.getoneExpense);


module.exports = router;