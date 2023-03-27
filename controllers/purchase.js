const Razorpay=require('razorpay');
const jwt=require('jsonwebtoken');
const Order=require('../models/orders');
const User=require('../models/signup');
const Usercontroller=('./login');

 function generateToken(id,name,ispremiumuser){
     return jwt.sign({userid:id,name:name,ispremiumuser},process.env.JWT_SECRET_KEY);
   }

// exports.purchasepremium=async (req,res)=>{
//     try{
//         console.log(process.env.Razorpay_key_id)
//        var rzp= new Razorpay({
//         key_id: process.env.Razorpay_key_id,
//         key_secret: process.env.Razorpay_key_secret
//        })
//         const amount=2500;

//         rzp.orders.create({
//             amount ,currency :'INR'
//         },(err,order)=>{
//             if(err){
//                 console.log(err)
//                 //throw new Error(JSON.stringify(err));

//             }
//             Order.create({
//                 orderid:order.id,status:'Pending'
//             }).then(()=>{
//                 return res.status(201).json({ order,key_id:rzp.key_id})
//             }).catch(err=>{
//                 throw new Error(err)
//             })
//         })
//     }
//     catch(err){
//         console.log(err);
//         res.status(403).json({message:' Something went wrong',error:err})
     
//     }
// }

exports.purchasepremium = async (req, res) => {
    try {
      console.log(process.env.Razorpay_key_id);
      var rzp = new Razorpay({
        key_id: process.env.Razorpay_key_id,
        key_secret: process.env.Razorpay_key_secret,
      });
      const amount = 2500;
      
      // Generate unique payment ID
      const paymentId = `PAYMENT_${Date.now()}`;
      
      rzp.orders.create(
        {
          amount,
          currency: "INR",
          receipt: paymentId,
          payment_capture: 1,
        },
        (err, order) => {
          if (err) {
            console.log(err);
            //throw new Error(JSON.stringify(err));
          }
          Order.create({
            paymentid: paymentId,
            orderid: order.id,
            status: "Pending",
            signupId:req.user._id
          })
            .then(() => {
              return res
                .status(201)
                .json({ order, key_id: rzp.key_id, payment_id: paymentId });
            })
            .catch((err) => {
              throw new Error(err);
            });
        }
      );
    } catch (err) {
      console.log(err);
      res.status(403).json({ message: "Something went wrong", error: err });
    }
  };
  
exports.updatetransactionstatus= async (req,res)=>{
    try{
       const {payment_id,order_id}=req.body;
       const order=await Order.findOne({orderid: order_id}).populate('signupId'); // add populate() to retrieve the signup document;
    promise1= Order.findByIdAndUpdate(order._id,{paymentid:payment_id,status:'Successful'})
    console.log("id>>>>>>>>>>>>>>>>>>>>>>>>>>>>.",order)
    promise2=User.findByIdAndUpdate(order.signupId._id,{ispremiumuser:true})
    Promise.all([promise1,promise2]).then(()=>{
        
     return res.status(202).json({success:true,message:"Transaction successful"
     //,token:generateToken(req.user._id,req.user.name,true)
     })
     }).catch((err)=>{
        console.log(err);
     })
    }
    catch(err){
        console.log(err);
        res.status(403).json({message:' Something went wrong',error:err})
     
        
    }
}

