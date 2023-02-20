const myForm=document.querySelector('#my-form');
const description=document.querySelector('#description');
const expenseAmount=document.querySelector('#amount');
const category=document.querySelector('#category');
const msg=document.querySelector('.msg');
myForm.addEventListener('submit', onSubmit);
//const Razorpay=require('razorpay');
function onSubmit(e){
    e.preventDefault();
    if(expenseAmount==='' ||description===''||  category===''){
        msg.classList.add('error');
        msg.innerHTML='Please enter all fields';
        setTimeout(()=> msg.remove(),2000);
    }
    else{
        let obj={
            description:description.value,
            expenseAmount:expenseAmount.value,
            category:category.value
        }
        const token=localStorage.getItem('token');
        axios.post("http://localhost:3000/expense/add-expense",obj,{headers: {'Authentication' :token}})
        .then((response) =>{
          showUserOnScreen(response.data.newexpense)
          localStorage.setItem(response.data.newexpense.id,JSON.stringify(obj));
          console.log(response.status);
        })
        .catch((err) =>{
        console.log(err);
        })
        expenseAmount.value='';
        description.value='';
        category.value='';
           }
}

document.getElementById('rzp-button').onclick=async function(e){
    const token=localStorage.getItem('token');
    const response=await axios.get('http://localhost:3000/purchase/purchasepremium',{headers: {'Authentication' :token}})
    console.log(response.data.key_id);
    console.log(response.data.order.id);
    var options={
        "key":response.data.key_id,
        "order_id":response.data.order.id,
        "handler":async function(response){
            await axios.post('http://localhost:3000/purchase/updatetransactionstatus',{
               order_id: options.order_id,
                payment_id: response.razorpay_payment_id,

            },{ headers:{'Authentication' :token}})
            alert('you are a premium User now')
        },
    };
    const rzp1= new Razorpay(options);
    rzp1.open();
    e.preventDefault();

    rzp1.on('payment failed',function(response){
        console.log(response);
        alert('Something went wrong');
    })



}



document.addEventListener("DOMContentLoaded", () => {  
    const token=localStorage.getItem('token');
    axios.get("http://localhost:3000/expense/get-expense",{headers: {'Authentication' :token}})
   .then((response)  =>{
     console.log(response);
     for(var i=0;i<response.data.allexpenses.length;i++){
        showUserOnScreen(response.data.allexpenses[i])
     }
   } )
   .catch((err)=>{
    console.log(err);
   })
});

function showUserOnScreen(user){
    const parentNode=document.getElementById('listofusers');
    console.log(parentNode);
    const childHTML=`<li id=${user.id}> ${user.expenseAmount} - ${user.description} - ${user.category}
    <button onclick=deleteExpense('${user.id}')> Delete Expense </button>
    <button onclick=EditExpense('${user.id}')> Edit Expense </button>
    </li>`
    parentNode.innerHTML=parentNode.innerHTML+childHTML;
}

function deleteExpense(userid){
          axios.delete(`http://localhost:3000/expense/delete-expense/${userid}`)
              .then((response) =>{
               removeUserFromScreen(userid)
               localStorage.removeItem(userid);
                 })
              .catch((err) =>{
              console.log(err);
              })
        }

function removeUserFromScreen(userid){
    const parentNode=document.getElementById('listofusers');
    const childToBeDeleted=document.getElementById(userid);
    if(childToBeDeleted){
        parentNode.removeChild(childToBeDeleted)
    }
}

function EditExpense(userid){
    axios.get(`http://localhost:3000/expense/get-expense/${userid}`)
   .then((response) =>{
    console.log(response.data.editexpenseid);
    document.getElementById('amount').value=response.data.editexpenseid.expenseAmount;
    document.getElementById('description').value=response.data.editexpenseid.description;
    document.getElementById('category').value=response.data.editexpenseid.category;
      deleteExpense(userid)
      })
   .catch((err) =>{
   console.log(err);
   })
}
