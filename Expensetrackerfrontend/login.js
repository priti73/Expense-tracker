const email=document.querySelector('#email');
const password=document.querySelector('#password');

 async function login(e){
   try{
        e.preventDefault();
        let logindetails={
            email:email.value,
            password:password.value
          }
      
    console.log(logindetails);
    const response= await axios.post("http://54.238.228.126:3000/users/login",
    logindetails)
    if(response.status==201){
        //alert(response.data.message)
        localStorage.setItem('token',response.data.token);
        window.location.href="./expense.html"
       
    }
    
        }catch(err){
         console.log(err);
         document.body.innerHTML=`<div style="color:red;">${err.message} <div>`
    }
}

document.getElementById('reset-button').onclick=async function(e){
    try{
        window.location.href="./resetform.html"
    }
    catch(err){
        console.log(err);
        document.body.innerHTML=`<div style="color:red;">${err.message} <div>`
    }
}