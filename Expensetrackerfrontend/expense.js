const myForm=document.querySelector('#my-form');
const description=document.querySelector('#description');
const expenseAmount=document.querySelector('#amount');
const category=document.querySelector('#category');
const msg=document.querySelector('.msg');

document.getElementById('submit').onclick=async function(e){
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
         const response=await axios.post("http://54.238.228.126:3000/expense/add-expense",obj,{headers: {'Authentication' :token}})
        
          showUserOnScreen(response.data.newexpense)
          localStorage.setItem(response.data.newexpense.id,JSON.stringify(obj));
          console.log(response.status);
        
        
        }
        expenseAmount.value='';
        description.value='';
        category.value='';
           }


document.getElementById('rzp-button').onclick=async function(e){
    const token=localStorage.getItem('token');
    const response=await axios.get('http://54.238.228.126:3000/purchase/purchasepremium',{headers: {'Authentication' :token}})
    console.log(response.data.key_id);
    console.log(response.data.order.id);
    var options={
        "key":response.data.key_id,
        "order_id":response.data.order.id,
        "handler":async function(response){
           const res= await axios.post('http://54.238.228.126:3000/purchase/updatetransactionstatus',{
               order_id: options.order_id,
                payment_id: response.razorpay_payment_id,
            },{ headers:{'Authentication' :token}})
            alert('you are a premium User now')
           showpremiumusermessage();
           showleaderboard();
           console.log(response);
           localStorage.setItem('token',res.data.token);
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

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

 function showpremiumusermessage(){
    document.getElementById('text').innerHTML='You are a premium user now';
    document.getElementById('rzp-button').style.visibility='hidden'; 
    /*const div = document.createElement('div');
    div.id = 'test';   
    div.innerHTML=`<label for="income">Income:</label>
                  <input type="text" id="income">`;
    document.getElementById('desc').appendChild(div);  
    const dailybutton=document.createElement('button');
    dailybutton.id='day';
    dailybutton.textContent="dailyexpense";
    document.getElementById('my-form').appendChild(dailybutton);

    const weaklybutton=document.createElement('button');
    weaklybutton.id='daily';
    weaklybutton.textContent="weaklyexpense";
    document.getElementById('my-form').appendChild(weaklybutton);

    const monthlybutton=document.createElement('button');
    monthlybutton.id='month';
    monthlybutton.textContent="monthlyexpense";
    document.getElementById('my-form').appendChild(monthlybutton);*/
 }

 function download(){
    const token=localStorage.getItem('token');
    axios.get('http://54.238.228.126:3000/expense/download', { headers: {"Authentication" : token} })
    .then((response) => {
        if(response.status === 200){
            //the bcakend is essentially sending a download link
            //  which if we open in browser, the file would download
            var a = document.createElement("a");
            a.href = response.data.fileurl;
            a.download = 'myexpense.csv';
            a.click();
        } else {
            throw new Error(response.data.message)
        }

    })
    .catch((err) => {
        showError(err)
        document.body.innerHTML=`<div style="color:red;">${'You have to buy premium subscription'} <div>`
    });
}

function showleaderboard(){
    const innputElement=document.createElement('input');
    innputElement.type="button";
    innputElement.value="Show Leaderboard";
    innputElement.onclick=async()=>{
    const token=localStorage.getItem('token');
    console.log(token);
       const userleaderarray=await axios.get('http://54.238.228.126:3000/premium/leaderboard',{headers: {'Authentication' :token}})
       var leaderboardelem=document.getElementById('leaderboard'); 
       leaderboardelem.innerHTML +=`<h1>Leader board</h1>`
       userleaderarray.data.forEach((userdetails) => {
       leaderboardelem.innerHTML+=`<li>Name -${userdetails.name} TotalExpense -${userdetails.totalexpense}</li>`
       });
    } 
    document.getElementById('text').appendChild(innputElement);
    
}

/*window.addEventListener("DOMContentLoaded",getExpenses);

async function getExpenses(){
    try{
        const parentNode=document.getElementById('listOfExpense');
        parentNode.innerHTML="";
        const token=localStorage.getItem("token");
       const num= document.getElementById('noOfPages');
       console.log("num",num.value);
        const LIMIT=2;
        const PAGE=1;

        const decodetoken=parseJwt(token);
        console.log(decodetoken);
        const ispremiumuser=decodetoken.ispremiumuser;
        if(ispremiumuser){
            showpremiumusermessage();
            showleaderboard();
        }
        const response=await axios.get(`http://localhost:3000/expense/get-expense?page=${PAGE}&limit=${LIMIT}`,
        {headers: {'Authentication' :token}});
        response.data.expense.forEach((expense)=>{
            showUserOnScreen(expense);
        })
      // createPagination(response.data.pages);
        
    }
    catch(err){
      console.log(err);
    }
}

function createPagination(pages){
    document.getElementById('pagination').innerHTML="";
    let childHTML="";
    for( var i=1;i<=pages;i++){
        childHTML+=`<a class= "mx-2" id= "page=${i}" >${i}</a>`;

    }
    const parentNode=document.getElementById('pagination');
    parentNode.innerHTML+=childHTML;
}

document.querySelector('pagination').addEventListener("click",getExpenses);

async function getexpensepage(e){
    const parentNode=document.getElementById("listOfExpense");
    parentNode.innerHTML="";
    const token=localStorage.getItem("token");
    try{
        let response=await axios.get(`http://localhost:3000/expense/get-expense${e.target.id}`,{headers: {'Authentication' :token}})
        for(var i=0;i<response.data.expenses.length;i++){
                 showUserOnScreen(response.data.expenses[i])
             }
             
       //createPagination(response.data.pages);
    }
    catch(err){
        console.log(err);
    }
}
  
document.getElementById('select').addEventListener("change",(e)=>{
    localStorage.setItem("select",e.target.value);
    getExpenses();
})
*/
document.addEventListener("DOMContentLoaded", () => {  
    const token=localStorage.getItem('token');
    const decodetoken=parseJwt(token);
    const name=decodetoken.name;
    const ispremiumuser=decodetoken.ispremiumuser;
    if(ispremiumuser){
        showpremiumusermessage();
        showleaderboard();
        }
    const page=1;
    axios.get(`http://54.238.228.126:3000/expense/get-expense?page=${page}`,{headers: {'Authentication' :token}})
   .then((response)  =>{
     console.log(response.data.expenses);
     for(var i=0;i<response.data.expenses.length;i++){
        showUserOnScreen(response.data.expenses[i])
     }
    //showexpense(response.data.expenses);
    //showPagination(response.data)
    console.log("pagedata",response.data);

   } )
   .catch((err)=>{
    console.log(err);
    document.body.innerHTML=`<div style="color:red;">${err.message} <div>`
   })
});
/*
function showPagination({
    currentPage,
    hasNextPage,
    nextPage,
    hasPreviousPage,
    previousPage,
    lastPage,
}){
    pagination.innerHTML='';
    if(hasPreviousPage){
        const btn2=document.createElement('button')
        btn2.innerHTML=previousPage
        btn2.addEventListener('click',()=>getExpenses(previousPage))
        pagination.appendChild(btn2)
    }

    const btn1=document.createElement('button')
    btn1.innerHTML=`<h3>${currentPage}</h3>`
    btn1.addEventListener('click',()=>getExpenses(currentPage))
    pagination.appendChild(btn1)

    if(hasNextPage){
        const btn3=document.createElement('button')
        btn3.innerHTML=nextPage
        btn3.addEventListener('click',()=>getExpenses(nextPage))
        pagination.appendChild(btn3)
    }
}

function getExpenses(page){
    const token=localStorage.getItem('token');
    const response=axios.get(`http://localhost:3000/expense/get-expense?page=${page}`,{headers: {'Authentication' :token}})
    .then((response)  =>{
        console.log(response);
        // for(var i=0;i<response.data.expenses.length;i++){
        //    showUserOnScreen(response.data.expenses[i])
        // }
        
       
    showexpense(response.data.expenses);
    showPagination(response.data)
    })
    .catch((err)=>
        console.log(err)
    );
}

*/
function showUserOnScreen(user){
    var parentNode=document.getElementById('listOfExpense');
    console.log('parentnode',parentNode);
    const childHTML=`<li id=${user.id}> ${user.expenseAmount} - ${user.description} - ${user.category}
    <button onclick=deleteExpense('${user.id}')> Delete Expense </button>
    <button onclick=EditExpense('${user.id}')> Edit Expense </button>
    </li>`
    parentNode.innerHTML=parentNode.innerHTML+childHTML;
   // parentNode.appendChild(childHTML);
}

function deleteExpense(userid){
          axios.delete(`http://54.238.228.126:3000/expense/delete-expense/${userid}`)
              .then((response) =>{
               removeUserFromScreen(userid)
               localStorage.removeItem(userid);
                 })
              .catch((err) =>{
              console.log(err);
              document.body.innerHTML=`<div style="color:red;">${err.message} <div>`
              })
        }

function removeUserFromScreen(userid){
    const parentNode=document.getElementById('listOfExpense');
    const childToBeDeleted=document.getElementById(userid);
    if(childToBeDeleted){
        parentNode.removeChild(childToBeDeleted)
    }
}

function EditExpense(userid){
    axios.get(`http://54.238.228.126:3000/expense/get-expense/${userid}`)
   .then((response) =>{
    console.log(response.data.editexpenseid);
    document.getElementById('amount').value=response.data.editexpenseid.expenseAmount;
    document.getElementById('description').value=response.data.editexpenseid.description;
    document.getElementById('category').value=response.data.editexpenseid.category;
      deleteExpense(userid)
      })
   .catch((err) =>{
   console.log(err);
   document.body.innerHTML=`<div style="color:red;">${err.message} <div>`
   })
}

