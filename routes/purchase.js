const path= require('path');
const express=require('express');

const purchasecontroller=require('../controllers/purchase');
const auntheticateController=require('../middleware/auth');

const router=express.Router();

router.get('/purchase/purchasepremium', auntheticateController.authenticate,purchasecontroller.purchasepremium);
router.post('/purchase/updatetransactionstatus', auntheticateController.authenticate,purchasecontroller.updatetransactionstatus);


module.exports=router;
